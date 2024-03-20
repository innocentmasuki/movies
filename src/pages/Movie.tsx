import { useLoaderData, useNavigate } from "react-router-dom";
import { MovieData } from "@/types";
import { IoMdStar } from "react-icons/io";
// @ts-ignore
import ColorThief from "colorthief";

import { getAvailableBrightest, loadImage } from "@/utils/getDominantColor.ts";
import { useState } from "react";
import { getLogo } from "@/utils/getRatingIcon.ts";
const Movie = () => {
  const movie = useLoaderData() as MovieData;
  const navigate = useNavigate();
  const colorThief = new ColorThief();
  const [color, setColor] = useState("rgb(255,255,255)");
  loadImage(movie.Poster).then((img) => {
    const c = colorThief.getPalette(img, 30);
    setColor(`rgb(${getAvailableBrightest(c).join(",")})`);
  });

  console.log(JSON.stringify(movie, null, 2));
  return (
    <div className={"h-full w-screen relative bg-black"}>
      <img
        src={movie.Poster}
        className={"h-screen w-screen object-cover absolute top-0 left-0"}
        alt={movie.Title}
      />
      <div className={"backdrop-blur fixed top-0 left-0 h-screen w-screen"} />
      <div className="fixed overflow-y-auto top-0 left-0 h-screen w-screen  bg-gradient-to-b from-transparent via-black/75  to-black">
        <div className="">
          <div
            className={
              "flex flex-col gap-4 h-screen p-4 md:px-10 justify-between"
            }
          >
            <button onClick={() => navigate(-1)}>Go Back</button>
            <div className={"flex flex-col gap-8"}>
              <div className={"flex flex-col md:items-start items-center "}>
                <span
                  className={"border-2  rounded-full px-4 py-[2px]"}
                  style={{ color, borderColor: color }}
                >
                  {movie.Rated}
                </span>
                <div
                  style={{ color }}
                  className={`text-4xl md:text-6xl mt-4 text-center md:text-left  font-montserrat font-semibold`}
                >
                  {movie.Title}
                </div>
              </div>
              <div
                className={
                  "flex flex-col  text-gray-400  md:flex-row justify-between gap-6 items-center"
                }
              >
                <div
                  className={
                    "flex flex-row items-center justify-center md:justify-start gap-4"
                  }
                >
                  {movie.Ratings.map((rating, index) => {
                    if (!getLogo(rating.Source)) return;
                    return (
                      <div
                        key={index}
                        className={"flex flex-row items-center gap-2"}
                      >
                        <img
                          alt={""}
                          src={getLogo(rating.Source)}
                          className={"h-[20px] aspect-auto object-fit "}
                        />
                        <span style={{ color, borderColor: color }}>
                          {rating.Value}
                        </span>
                      </div>
                    );
                  })}
                  <span className={" text-center hidden md:block ml-10"}>
                    {movie.Runtime}
                  </span>
                </div>
                <span className={" text-center md:hidden"}>
                  {movie.Runtime}
                </span>
                <div className={"flex flex-row gap-3 items-center"}>
                  <IoMdStar className={"text-yellow-400 text-[24px]"} />
                  {movie.Runtime}
                </div>
              </div>

              <div className={" text-gray-400 text-center md:text-left"}>
                {movie.Plot}
              </div>
            </div>
          </div>
        </div>
        <img
          src={movie.Poster}
          className={"h-[400px] aspect-auto object-cover "}
          alt={movie.Title}
        />

        {/*{getRatingIcon(movie.Rated) && (*/}
        {/*  <img*/}
        {/*    src={getRatingIcon(movie.Rated)}*/}
        {/*    className={*/}
        {/*      "h-[70px] bg-white aspect-auto border-4 border-white object-fit"*/}
        {/*    }*/}
        {/*    alt={movie.Rated}*/}
        {/*  />*/}
        {/*)}*/}
      </div>
    </div>
  );
};
export default Movie;
