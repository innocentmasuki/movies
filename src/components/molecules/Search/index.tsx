import { useCallback, useEffect, useRef, useState } from "react";
import { setSearchQuery } from "@/redux/slices/searchQuerySlice.ts";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks.ts";
import { useSearchParams } from "react-router-dom";
import { IoClose, IoSearch } from "react-icons/io5";
import CursorShadow from "@/components/atoms/CursorShadow";
import Logo from "@/components/atoms/Logo";
import { searchMovies } from "@/api/movieSdk.ts";
import { setSearchResult } from "@/redux/slices/searchResultsSlice.ts";

export const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const searchQueryRef = useRef("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const cursorShadowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.searchQuery.value);
  const [searchParams] = useSearchParams();
  const currentSearch = useRef(searchQuery);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchQuery(inputValue));
      searchQueryRef.current = inputValue;
    }, 800);
    return () => clearTimeout(timeoutId);
  }, [inputValue, dispatch]);

  const handleSearchQueryChange = (query: string) => {
    setInputValue(query);
    window.history.replaceState({}, "", `?q=${query}`);
  };

  const search = useCallback(() => {
    dispatch(setSearchResult([]));
    searchMovies(searchQuery).then((data) => dispatch(setSearchResult(data)));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (searchQuery.trim() === "") return;
    if (searchQuery !== currentSearch.current) {
      search();
      currentSearch.current = searchQuery;
    }
  }, [search, searchQuery]);

  const focusInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  useEffect(() => {
    focusInput();
    if (searchParams.get("q")) {
      dispatch(setSearchQuery(searchParams.get("q")!));
      setInputValue(searchParams.get("q")!);
    }
  }, [dispatch]);
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (cursorShadowRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      cursorShadowRef.current.style.transform = `translate(${x - 115}px, ${y - 115}px)`;
    }
  };

  return (
    <nav
      className={
        " w-full sticky backdrop-blur bg-black md:bg-transparent items-center justify-between flex flex-row z-[60] top-0"
      }
    >
      <Logo className={"mt-4"} />
      <div
        onMouseMove={handleMouseMove}
        ref={containerRef}
        className={
          "flex flex-col-reverse group relative overflow-hidden  gap-3 md:flex-row justify-between  rounded-3xl md:rounded-full  px-2  py-2  items-center w-full md:w-auto  mt-4 md:my-4 md:mt-8"
        }
      >
        <div
          className={
            "flex flex-col w-full z-[90] md:w-auto items-start px-2 rounded-2xl md:rounded-full bg-gray-800"
          }
        >
          <div className={"flex flex-row w-full items-center"}>
            <input
              ref={searchInputRef}
              className={
                "bg-transparent text-white  pl-2 py-3 w-full md:w-auto outline-none border-none"
              }
              type={"text"}
              role={"search"}
              value={inputValue}
              placeholder={"Search for movies..."}
              onChange={(e) => handleSearchQueryChange(e.target.value)}
            />
            {inputValue ? (
              <IoClose
                onClick={() => {
                  handleSearchQueryChange("");
                  focusInput();
                }}
                className={"text-white text-2xl mx-2 cursor-pointer"}
              />
            ) : (
              <IoSearch className={"text-white text-2xl mx-2"} />
            )}
          </div>
          {inputValue.trim().length > 0 && inputValue.trim().length <= 2 && (
            <span
              role={"note"}
              className={"text-[9px] text-gray-300 pb-1 pl-2"}
            >
              Minimum 3 characters
            </span>
          )}
        </div>
        <CursorShadow ref={cursorShadowRef} hasPosition />
      </div>
    </nav>
  );
};

export default Search;
