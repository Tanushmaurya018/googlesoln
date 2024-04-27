import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import SingleList from "../components/SingleList";
import Sample from "../components/Sample";
import axios from "axios";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import photo1 from "../assets/homeimg/1.jpg";
import photo2 from "../assets/homeimg/2.jpg";
import photo3 from "../assets/homeimg/3.jpg";
import photo4 from "../assets/homeimg/4.jpg";

const list = [photo1, photo2, photo3, photo4];
const Home = () => {
  const [lists, setLists] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  SwiperCore.use([Navigation]);
  SwiperCore.use([Autoplay]);

  SwiperCore.use([Pagination]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://us-west-2.aws.neurelo.com/rest/listings",
          {
            headers: {
              "X-API-KEY":
                "neurelo_9wKFBp874Z5xFw6ZCfvhXeGq7u9wcG3qNdLNqOo74C2F+LaH4cKx5ezPFu3dmeypd/4F3jjta4A6j/SgznzPOKrewIWDKc3fxjZAYml6VOsM/KmdMvFTDsGLYSYIPXYN5GAr+pNwXY/tGwKZJgF91YaQ6fFs+eCSqWnA9Ruc9uoHovTTJ4vPu7DjQBeodwa/_U1hSf3yW6S65HVizNvIHNALadYaxu0Of4ZX6dfooXH4=",
            },
          }
        );
        setLists(response.data.data);
        setLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex-col">
          <div className="w-full h-[500px]  ">
            <div className=" flex flex-col justify-between relative  w-full h-full  p-5">
              {/* <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-black opacity-80 rounded-2xl"></div> */}
              <div className="absolute top-0 bottom-0 left-0 right-0 p-0 h-full">
                <Swiper
                  className="w-full h-full"
                  loop={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                >
                  {list.map((url) => (
                    <SwiperSlide key={url}>
                      <div className="h-auto  md:h-full flex  justify-center p- overflow-hidden  ">
                        <img
                          src={url}
                          className="shadow-sm shadow-current  h-[500px] md:h-full w-full object-cover "
                        ></img>
                        <div className="absolute  inset-0 bg-gradient-to-l from-transparent to-black opacity-95"></div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <h1 className=" flex justify-center text-3xl md:text-7xl text-gray-300 z-[2]">
                Welcome To JuniorLearnLink
              </h1>
              <p
                className="text-sm md:text-3xl text-gray-400 w-3/4
              z-[2]"
              >
                Welcome to JuniorLearnLink.com - Where seniors share wisdom,
                juniors thrive. Your go-to platform for collaborative learning
                and resource exchange.
              </p>

              <div className="flex justify-between z-[2]">

                <Link to="/createlisting">
                  <h1 className="  text-2sm md:text-2xl z-10 px-5 md:px-10 rounded-full bg-blue-600  py-2 text-white">
                    Create Listing
                  </h1>
                </Link>
              </div>
            </div>
          </div>

          <div className=" flex justify-center  items-center h-full">
            <div className=" flex flex-wrap justify-center items-center ">
              {lists?.map((list) => {
                return (
                  <Link to={`/listing/${list.id}`} key={list.id}>
                    <Card
                      imageUrls={`${list.imageUrls[0]}`}
                      title={`${list.title}`}
                      description={`${list.description}`}
                      topic={`${list.topic}`}
                      type={`${list.rent === "YES" ? "Rent" : "Sale"}`}
                    />
                  </Link>
                );
              })}
            </div>

            <div>
              {lists?.length == 0 && (
                <h1 className="text-5xl p-20">No List Available</h1>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
