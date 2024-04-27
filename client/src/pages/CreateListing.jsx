import React, { useState } from "react";
// import defaultListPic from "../assets/defaultListPic.png";
import axios from "axios";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";

import { formatProdErrorMessage } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import defaultListPic from "../assets/defaultList.png"


const CreateListing = () => {
  const {currentUser} =useSelector((state)=>state.user)
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    author:currentUser?.userWoPassword._id,
    title: "",
    description: "",
    topic: "",
    imageUrls: [defaultListPic],
  });
  const [filePerc, setFilePerc] = useState(0);
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()

  const uploadImage = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 31) {
      const promises = [];
      setUploading(true);
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      if (files.length>31) {
        setImageUploadError("You can only upload 30 images per listing");
        setUploading(false);
      }

    }
  };
  const deleteImageUrl = (i) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, key) => i !== key),
    });
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storgeRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storgeRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFilePerc(Math.round(progress));
          },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const changeUserData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
        const response = await axios.post(
          "https://us-west-2.aws.neurelo.com/rest/listings/__one",formData,
          {
            headers: {
              "X-API-KEY":
                "neurelo_9wKFBp874Z5xFw6ZCfvhXeGq7u9wcG3qNdLNqOo74C2F+LaH4cKx5ezPFu3dmeypd/4F3jjta4A6j/SgznzPOKrewIWDKc3fxjZAYml6VOsM/KmdMvFTDsGLYSYIPXYN5GAr+pNwXY/tGwKZJgF91YaQ6fFs+eCSqWnA9Ruc9uoHovTTJ4vPu7DjQBeodwa/_U1hSf3yW6S65HVizNvIHNALadYaxu0Of4ZX6dfooXH4=",
            },
          }
        );      // console.log("Saved Listing",response.data);
      navigate("/profile")
      setLoading(false)

    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };
  return (
    <div className="transition-all ease-linear container mx-auto p-2 h-full w-full">
            {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-10  md:gap-20 w-full bg-gray-700 rounded-2xl p-5 text-gray-300">
        <h1 className=" text-6xl font-Montserrat text-center">
          Create Listing
        </h1>
        <div className="flex flex-col md:flex-row justify-between w-full ">

          <div className="flex flex-col gap-5 w-full md:w-2/3">
            <input
              type="text"
              name="title"
              className="text-xl px-1 bg-transparent border-b-2 border-gray-500 mt-2 
        focus:outline-none w-full focus:bg-transparent"
              onChange={changeUserData}
              value={formData.title}
              placeholder="Title..."
              required
            ></input>
            <textarea
              type="text"
              name="description"
              className="h-[200px] text-xl p-3 bg-transparent border-2 border-gray-500 mt-2 
        focus:outline-none w-full focus:bg-transparent"
              placeholder="Description..."
              onChange={changeUserData}
              value={formData.description}
              required
            ></textarea>
            <input
              type="text"
              name="topic"
              className="text-xl px-1 bg-transparent border-b-2 border-gray-500 mt-2 
        focus:outline-none w-full focus:bg-transparent"
              placeholder="Topic..."
              onChange={changeUserData}
              value={formData.topic}
              required
            ></input>

          </div>

          <div className="flex flex-col justify-center items-center border-2 gap-5 border-black p-5">
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((img, i) => (
                <div
                  className="flex justify-between items-center w-full bg-gray-900 p-4 rounded-md"
                  key={img}
                >
                  <img
                    src={img}
                    alt={img}
                    className="h-[100px] w-[120px] object-cover rounded-lg"
                  />
                  <button
                    onClick={() => deleteImageUrl(i)}
                    className="text-red-500"
                  >
                    DELETE
                  </button>
                </div>
              ))}
            <input
              type="file"
              name="images"
              className="relative opacity-70 bg-purple-300 w-full px-5 py-3 rounded-full"
              onChange={(e) => setFiles(e.target.files)}
              // value={formData.imageUrls}

              multiple
            ></input>
            {uploading ? (<div className="flex flex-col justify-center items-center">
              <button className="cursor-no-drop border-2 bg-blue-500 text-white px-10 py-2 rounded-full text-2xl">
                Uploading{" "}
              </button>
              <h1 className="text-green-800 text-xl">{filePerc}%</h1>
              </div>
            ) : (<div className="flex flex-col justify-center items-center">
              <button
                onClick={uploadImage}
                className="border-2 bg-blue-500 text-white px-10 py-2 rounded-full text-2xl"
              >
                Upload
              </button>
              </div>
            )}
            {imageUploadError && (
              <label className="text-red-500">!! {imageUploadError} !!</label>
            )}{" "}
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <button
            className="font-Montserrat  text-xl rounded-full px-16 text-white
           bg-green-600 hover:bg-white hover:text-black transition ease-linear 
           p-3"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default CreateListing;
