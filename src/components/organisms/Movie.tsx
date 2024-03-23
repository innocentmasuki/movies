import { useNavigate, useParams } from "react-router-dom";
import { MovieData } from "@/types";
import ColorThief from "colorthief";

import { getAvailableBrightest, loadImage } from "@/utils/getDominantColor.ts";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { setViewedMovies } from "@/redux/slices/viewedMoviesSlice.ts";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks.ts";
import Plot from "@/components/molecules/Plot";
import Logo from "@/components/atoms/Logo";
import { getMovieByIMDBID } from "@/api/movieSdk.ts";
import Button from "@/components/atoms/Button";
import MovieDetails from "@/components/molecules/Movies/MovieDetails.tsx";
import MovieHeader from "@/components/molecules/Movies/MovieHeader.tsx";
import MovieGenre from "@/components/molecules/Movies/MovieGenre.tsx";
import MovieActors from "@/components/molecules/Movies/MovieActors.tsx";
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
        className={"h-screen w-screen object-cover absolute top-0 left-0"}
        alt={movie?.Title}
      />
      <div className={"backdrop-blur fixed top-0 left-0 h-screen w-screen"} />
      <div className="fixed overflow-y-auto top-0 left-0 h-screen w-screen  bg-gradient-to-b from-transparent via-black/75  to-black">
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
          <div
            className={`flex w-full h-full ${!movie && "justify-center items-center"} flex-col md:px-10 px-4 gap-5`}
          >
            {!movie ? (
              <div style={{ color }} className={"font-semibold"}>
                Loading...
              </div>
            ) : (
              <>
                <MovieHeader movie={movie!} color={color} />
                <MovieDetails movie={movie!} color={color} />
                <MovieGenre genre={movie?.Genre} />
                <MovieActors actors={movie?.Actors} />
                <Plot plot={movie?.Plot} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
