import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";

import Login from "../pages/Login";
const Listing = () => {
  const {currentUser} =useSelector((state)=>state.user)
  SwiperCore.use([Navigation]);
  SwiperCore.use([Autoplay]);

  SwiperCore.use([Pagination]);
  const [list, setList] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const listId = params.listId;
  const [message, setMessage] = useState("");

  const handleTextareaChange = (event) => {
    setMessage(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://us-west-2.aws.neurelo.com/rest/listings/${listId}`, {
          headers: {
            'X-API-KEY': 'neurelo_9wKFBp874Z5xFw6ZCfvhXeGq7u9wcG3qNdLNqOo74C2F+LaH4cKx5ezPFu3dmeypd/4F3jjta4A6j/SgznzPOKrewIWDKc3fxjZAYml6VOsM/KmdMvFTDsGLYSYIPXYN5GAr+pNwXY/tGwKZJgF91YaQ6fFs+eCSqWnA9Ruc9uoHovTTJ4vPu7DjQBeodwa/_U1hSf3yW6S65HVizNvIHNALadYaxu0Of4ZX6dfooXH4='
          }
        });
        setList(response.data.data);
        setUser(response.data.userWoPassword);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="transition-all  text-gray-300 ease-linear container mx-auto overflow-hidden min-h-[100vh]">
      {loading ? <Loader/> 
      :
      currentUser == null ? 
        <div className="relative">
          <h1 className="absolute top-2 bottom-0 flex justify-center right-0 left-0 text-5xl ">
            Sign In to view
          </h1>
          <Login />
        </div>
      
      : (
        <div className="w-full p-1 ">
          {list && (
            <div className="bg-gray-700 w-full md:p-2 p-5 ">
            <Swiper
                loop={true}
                navigation
                // autoplay={{
                //   delay: 2500,
                //   disableOnInteraction: false,
                // }}
                pagination={{
                  clickable: true,
                }}
                style={{
                  "--swiper-pagination-color": "#FFBA08",
                  "--swiper-pagination-bullet-inactive-color": "#999999",
                  "--swiper-pagination-bullet-inactive-opacity": "1",
                  "--swiper-pagination-bullet-size": "16px",
                  "--swiper-pagination-bullet-horizontal-gap": "6px",
                }}
              >
                {list.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <div className="h-auto  md:h-[450px] flex  justify-center p-2 ">
                      <img
                        src={url}
                        className="shadow-sm shadow-current rounded-2xl object-contain "
                      ></img>
                      {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-95"></div> */}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="w-full flex flex-wrap p-5 gap-5 ">
                <h1 className="text-3xl md:text-5xl  w-full text-center underline">
                  {list.title}
                </h1>

                <div className="w-full flex md:flex-row flex-col ">
                <div className="w-full md:w-1/2  text-2xl p-3 md:p-8 flex flex-col gap-5 bg-gray-500 rounded-xl">
                    <div className="flex  items-center text-xl md:text-3xl">
                      {/* <label className="font-bold text-black"></label> */}
                      <h1 className="">
                        <span className="font-bold">Description : </span>
                        {list.description}
                      </h1>
                    </div>
                    <div className="flex  items-center text-xl md:text-3xl">
                      {/* <label className="font-bold text-black"></label> */}
                      <h1 className="">
                        <span className="font-bold">Subject : </span>
                        {list.topic}
                      </h1>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2  p-5 justify-center items-center">
                    <textarea
                      className="w-full bg-gray-500 rounded-2xl p-4 text-lg h-[300px] placeholder:text-black"
                        placeholder="Send Your Message to Author..."
                      value={message}
                      onChange={handleTextareaChange}
                    ></textarea>
                    <a
                      href={`mailto:${user?.email}?subject=Query Regarding Your Estate&body=${message}`}
                    >
                      <button className="w-full bg-gray-900 text-white px-4 py-2 rounded-full">
                        Contact
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
      )
    

      }


    </div>
  );
};

export default Listing;
