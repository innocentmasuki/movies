import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks.ts";
import { Link, useSearchParams } from "react-router-dom";
import { MovieData } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { setSearchQuery } from "@/redux/slices/searchQuerySlice.ts";
import { getMovies } from "@/api/movieSdk.ts";
import { setMovies } from "@/redux/slices/moviesSlice.ts";
import { getAvailableBrightest, loadImage } from "@/utils/getDominantColor.ts";
// @ts-ignore
import ColorThief from "colorthief";

function Home() {
  let [searchParams] = useSearchParams();
  const colorThief = new ColorThief();

  const [inputValue, setInputValue] = useState("");
  const searchQuery = useAppSelector((state) => state.searchQuery.value);
  const movies = useAppSelector((state) => state.movies.value);
  const searchQueryRef = useRef("");

  const [hoveredItem, setHoveredItem] = useState<any>();
  const shinyRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (hoveredItem !== null) {
      const gridItem = event.currentTarget.childNodes[hoveredItem];
      // @ts-ignore
      const rect = gridItem?.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // @ts-ignore
      shinyRef.current.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
    }
  };

  const fetchMovies = useCallback(async () => {
    getMovies().then((data) => dispatch(setMovies(data)));
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchQuery(inputValue));
      searchQueryRef.current = inputValue;
    }, 700);
    return () => clearTimeout(timeoutId);
  }, [inputValue, 700]);
  const dispatch = useAppDispatch();

  const handleSearchQueryChange = (query: string) => {
    setInputValue(query);
    window.history.replaceState({}, "", `?q=${query}`);
  };

  useEffect(() => {
    if (!movies.length) {
      fetchMovies();
    }

    if (searchParams.get("q")) {
      dispatch(setSearchQuery(searchParams.get("q")!));
    }
  }, []);

  useEffect(() => {
    if (searchQuery === "" || searchQuery === searchQueryRef.current) return;
    console.log("Query", searchQuery);
    console.log("Ref", searchQueryRef.current);
  }, [searchQuery]);

  return (
    <div className={" bg-black h-screen overflow-y-auto"}>
      <div className={"flex  p-4  flex-col w-full h-full gap-1"}>
        <div className={"flex flex-row w-full"}>
          <input
            className={"w-full border-2 border-black"}
            type={"text"}
            onChange={(e) => handleSearchQueryChange(e.target.value)}
          ></input>
        </div>
        <div
          className={"w-full gap-3 grid grid-cols-1 md:grid-cols-2"}
          onMouseMove={handleMouseMove}
        >
          {movies.length > 0 &&
            movies.map((movie: MovieData, index) => {
              let color1 = "rgb(255,255,255,0)";
              let color2 = "rgb(255,255,255,0)";
              let color3 = "rgb(255,255,255,0)";
              loadImage(movie.Poster).then((img) => {
                const c = colorThief.getPalette(img, 30);
                color1 = `rgb(${getAvailableBrightest(c).join(",")},0.5)`;
                color2 = `rgb(${getAvailableBrightest(c).join(",")},0)`;
                color3 = `rgb(${getAvailableBrightest(c).join(",")},0)`;
              });

              console.log("Color", color1, color2, color3);
              return (
                <Link key={movie.imdbID} to={`/${movie.imdbID}`}>
                  <div
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={
                      "flex flex-row glass w-full overflow-hidden  gap-3 justify-start grid-item "
                    }
                  >
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className={"h-[200px] w-[135px] object-cover"}
                    />
                    <div>{movie.Title}</div>
                    <div
                      style={{
                        backgroundImage: `radial-gradient(${color1}, ${color2}, ${color3})`,
                      }}
                      className="shiny-overlay h-[600px] aspect-square  rounded-full"
                      ref={index === hoveredItem ? shinyRef : null}
                    />
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;
