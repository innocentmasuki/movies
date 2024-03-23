import { Link, useNavigate, useParams } from "react-router-dom";
import { AditionalData, MovieData } from "@/types";
import { IoMdStar, IoMdPlay } from "react-icons/io";
import ColorThief from "colorthief";

import { getAvailableBrightest, loadImage } from "@/utils/getDominantColor.ts";
import { useEffect, useState } from "react";
import { getLogo } from "@/utils/getRatingIcon.ts";
import { Helmet } from "react-helmet";
import { setViewedMovies } from "@/redux/slices/viewedMoviesSlice.ts";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks.ts";
import Plot from "@/components/molecules/Plot";
import Logo from "@/components/atoms/Logo";
import { getMovieByIMDBID } from "@/api/movieSdk.ts";
import Button from "@/components/atoms/Button";
const Movie = () => {
  const dispatch = useAppDispatch();
  const viewedMovies = useAppSelector((state) => state.viewedMovies.value);
  const navigate = useNavigate();
  const colorThief = new ColorThief();
  const [movie, setMovie] = useState<MovieData | undefined>();

  const { imdbID } = useParams();
  const [color, setColor] = useState("rgb(255,255,255)");

  if (movie) {
    loadImage(movie?.Poster).then(async (img) => {
      const c = await colorThief.getPalette(img, 30);
      setColor(`rgb(${getAvailableBrightest(c).join(",")})`);
    });
  }

  useEffect(() => {
    if (imdbID) {
      if (viewedMovies.some((movie) => movie?.imdbID === imdbID)) {
        setMovie(viewedMovies.find((movie) => movie?.imdbID === imdbID)!);
        return;
      }
      getMovieByIMDBID(imdbID as `${"tt"}${number}`).then((data) => {
        setMovie(data);
        dispatch(setViewedMovies([...viewedMovies, data]));
      });
    }
  }, [dispatch, imdbID, viewedMovies]);

  return (
    <div className={"h-full w-screen relative bg-app-background"}>
      {movie && (
        <Helmet>
          <title>{movie.Title} - Movie Database</title>
          <meta name="description" content={movie.Plot} />
          <meta property="og:title" content={movie.Title} />
          <meta property="og:image" content={movie.Poster} />
        </Helmet>
      )}

      <img
        src={movie?.Poster}
        className={
          "h-screen transform-gpu  w-screen object-cover absolute top-0 left-0"
        }
        alt={movie?.Title}
      />
      <div className={"backdrop-blur fixed top-0 left-0 h-screen w-screen"} />
      <div className="fixed overflow-y-auto top-0 left-0 h-screen w-screen  bg-gradient-to-b from-transparent via-black/75  to-black">
        <div className="">
          <div
            className={
              "flex flex-col gap-4 md:gap-6 h-screen  pb-4  md:justify-start"
            }
          >
            <div
              className={
                "flex flex-row w-full items-center px-4 md:px-10 pt-4 pb-3 bg-black md:bg-transparent sticky top-0 backdrop-blur justify-between"
              }
            >
              <Button onClick={() => navigate(-1)} text={"Back"} />
              <Logo />
            </div>
            <div className={"flex flex-col md:px-10 px-4 gap-5"}>
              <div
                className={
                  "flex flex-row justify-center md:justify-start duration-75"
                }
              >
                <img
                  src={movie?.Poster}
                  className={"h-[400px] aspect-auto object-cover "}
                  alt={movie?.Title}
                />
              </div>

              <div className={"flex flex-col md:items-start items-center "}>
                <span
                  className={"border-2  rounded-full px-4 py-[2px]"}
                  style={{ color, borderColor: color }}
                >
                  {movie?.Rated}
                </span>
                <div
                  style={{ color }}
                  className={`text-4xl md:text-6xl mt-4 text-center md:text-left  font-montserrat font-semibold`}
                >
                  {movie?.Title}
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
                  {movie?.Ratings.map((rating, index) => {
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
                  <span
                    style={{ color }}
                    className={" text-center hidden md:block ml-10"}
                  >
                    {movie?.Runtime}
                  </span>
                </div>
                <span className={" text-center md:hidden"}>
                  {movie?.Runtime}
                </span>
                <div
                  style={{ color }}
                  className={"flex flex-row gap-1 items-center"}
                >
                  {<IoMdStar className={"text-yellow-400 text-[24px]"} />}
                  {movie?.imdbVotes}
                </div>
              </div>
              <Plot plot={movie?.Plot} />

              {movie?.additional.trailer?.youtube_video_id && (
                <WatchTrailer data={movie?.additional} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;

const WatchTrailer = ({ data }: { data: AditionalData }) => {
  return (
    <div
      className={
        "flex flex-row justify-center md:justify-start gap-4 mb-0 md:mb-10"
      }
    >
      <Link to={`https://youtu.be/${data.trailer?.youtube_video_id}`}>
        <button
          className={
            "flex flex-row items-center px-4 py-2 rounded-full border-2 gap-2 bg-white border-transparent duration-75  text-black hover:bg-black hover:text-white hover:border-white"
          }
        >
          Trailer <IoMdPlay />
        </button>
      </Link>
      <Link to={`https://imdb.com/title/${data.trailer?.youtube_video_id}`}>
        <button
          className={
            "flex flex-row items-center px-4 py-2 border-2 duration-75 border-transparent rounded-full gap-2 text-white hover:border-white"
          }
        >
          More Info
        </button>
      </Link>
    </div>
  );
};
