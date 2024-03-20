import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks.ts";
import { useLoaderData, Link, useSearchParams } from "react-router-dom";
import { MovieData } from "@/types";
import { useEffect, useRef, useState } from "react";
import { setSearchQuery } from "@/redux/slices/searchQuerySlice.ts";

function Home() {
  const movies = useLoaderData() as MovieData[];
  let [searchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState("");
  const searchQuery = useAppSelector((state) => state.searchQuery.value);
  const searchQueryRef = useRef("");

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
    <div className={"p-4"}>
      <div className={"flex flex-col w-full gap-1"}>
        <div className={"flex flex-row w-full"}>
          <input
            className={"w-full border-2 border-black"}
            type={"text"}
            onChange={(e) => handleSearchQueryChange(e.target.value)}
          ></input>
        </div>
        {movies.map((movie: MovieData) => (
          <Link key={movie.imdbID} to={`/${movie.imdbID}`}>
            <div
              className={
                "flex flex-row w-full bg-green-500 gap-3 justify-start"
              }
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className={"h-[200px] w-[135px] object-cover"}
              />
              <div>{movie.Title}</div>
            </div>
          </Link>
        ))}
      </div>
      <div>
        <pre>{JSON.stringify(movies, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Home;
