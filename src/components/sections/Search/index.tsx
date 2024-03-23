import { useEffect, useRef, useState } from "react";
import { setSearchQuery } from "@/redux/slices/searchQuerySlice.ts";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks.ts";
import { useSearchParams } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import CursorShadow from "@/components/ui/CursorShadow";

export const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const searchQueryRef = useRef("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const cursorShadowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
  }, [searchInputRef.current]);
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (cursorShadowRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      cursorShadowRef.current.style.transform = `translate(${x - 115}px, ${y - 115}px)`;
    }
  };

  const contentTypes = ["movies", "shows"];

  return (
    <nav className={" w-full sticky backdrop-blur z-[60] top-0"}>
      <div
        onMouseMove={handleMouseMove}
        ref={containerRef}
        className={
          "flex flex-col-reverse group relative overflow-hidden  gap-3 md:flex-row justify-between bg-black rounded-3xl md:rounded-full md:pl-6 px-4 md:pr-2 py-3 md:py-2 items-center w-full md:w-3/4 mx-auto mt-4 md:my-4 md:mt-8"
        }
      >
        <div className={"flex flex-row z-[90] items-center text-base"}>
          {contentTypes.map((type) => (
            <div
              key={type}
              onClick={() => setContentType(type as "movies" | "shows")}
              className={
                "flex flex-col justify-start cursor-pointer items-center"
              }
            >
              <span className={"text-white font-bold mx-4"}>{type}</span>
              <div
                className={`h-1 w-2/3 mt-1 ${type === contentType ? "bg-white" : "bg-transparent"} `}
              />
            </div>
          ))}
        </div>
        <div
          className={
            "flex flex-row w-full z-[90] md:w-auto items-center px-2 rounded-2xl md:rounded-full bg-gray-700"
          }
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
        <CursorShadow ref={cursorShadowRef} hasPosition />
      </div>
    </nav>
  );
};

export default Search;
