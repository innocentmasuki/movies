import { useEffect, useRef, useState } from "react";
import { setSearchQuery } from "@/redux/slices/searchQuerySlice.ts";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks.ts";
import { useSearchParams } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

export const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const searchQueryRef = useRef("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [contentType, setContentType] = useState<"movies" | "shows">("movies");
  const searchQuery = useAppSelector((state) => state.searchQuery.value);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchQuery(inputValue));
      searchQueryRef.current = inputValue;
    }, 700);
    return () => clearTimeout(timeoutId);
  }, [inputValue, 700]);

  const handleSearchQueryChange = (query: string) => {
    setInputValue(query);
    window.history.replaceState({}, "", `?q=${query}`);
  };

  useEffect(() => {
    if (searchQuery === "" || searchQuery === searchQueryRef.current) return;
    console.log("Query", searchQuery);
    console.log("Ref", searchQueryRef.current);
  }, [searchQuery]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
    if (searchParams.get("q")) {
      dispatch(setSearchQuery(searchParams.get("q")!));
    }
  }, []);
  return (
    <nav className={"flex flex-row w-full"}>
      <div
        className={
          "flex flex-row justify-between bg-gray-950 rounded-full z-20 pl-6 pr-2 py-2 items-center w-full md:w-3/4 mx-auto my-4 md:mt-8"
        }
      >
        <div className={"flex flex-row items-center text-base text-gray-500"}>
          <span
            onClick={() => setContentType("movies")}
            className={`${contentType === "movies" && "text-white"} cursor-pointer mx-4`}
          >
            Movies
          </span>
          <span
            onClick={() => setContentType("shows")}
            className={`${contentType === "shows" && "text-white"} cursor-pointer mx-4`}
          >
            Shows
          </span>
        </div>
        <div
          className={"flex flex-row items-center px-2 rounded-full bg-gray-800"}
        >
          <input
            ref={searchInputRef}
            className={
              "bg-transparent text-white  pl-3 py-3 w-full md:w-auto outline-none border-none"
            }
            type={"text"}
            onChange={(e) => handleSearchQueryChange(e.target.value)}
          />
          <IoSearch className={"text-white text-2xl mx-2"} />
        </div>
      </div>
    </nav>
  );
};

export default Search;
