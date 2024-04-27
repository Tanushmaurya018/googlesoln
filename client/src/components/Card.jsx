import axios from "axios";
import React, { useEffect, useState } from "react";
import { PiBooks } from "react-icons/pi";

const Card = (props) => {
  // const [list,setList]=useState();
  //     const fetchData=async()=>{
  //     const response=await axios.get(`/api/getalllist`)

  //     setList(response.data.allList)

  // }

  // useEffect(()=>{
  //     fetchData()
  // },[])

  return (
    <div className=" hover:scale-105  duration-200  bg-gray-600 hover:bg-white transition-all ease-linear text-gray-300 hover:text-black m-5 rounded-2xl p-4">
      <div className="flex flex-col justify-between w-[300px] md:w-[420px] h-[450px]  gap-2 overflow-hidden b">
        <img
          src={`${props.imageUrls}`}
          className=" object-cover rounded-2xl flex justify-center items-center w-[450px] h-[100px] md:h-[200px]"
        />
        <h1 className="text-3xl font-bold ">{props.title}</h1>
        <h1 className="text-xl text-black font-medium flex gap-2 items-center">
          {props.description}
        </h1>
        <div className="flex justify-between">
          <h1 className="text-xl flex items-center gap-2">
            <PiBooks /> : {props.topic}
          </h1>
          {/* <h1 className="text-xl">{props.topic}</h1> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
