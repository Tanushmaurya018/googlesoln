import React from "react";
import bufferGif from "../assets/buffer2.gif";
const Loader = () => {
  return (
    <div
      className="z-[1000] fixed top-0 bottom-0 left-0 right-0  flex justify-center items-center h-full 
     bg-black backdrop-blur-sm  bg-opacity-70"
    >
      <div className="grayscale flex justify-center items-center flex-col gap-20">
        <h1 className="text-5xl text-gray-900">Website's running slowly due to free server</h1>

        <img src={bufferGif} className="bg-cover h-[100px]"></img>
      </div>
    </div>
  );
};

export default Loader;
