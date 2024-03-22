import { useEffect, useRef, useState } from "react";
import { setSearchQuery } from "@/redux/slices/searchQuerySlice.ts";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks.ts";

export const Navigation = () => {
  const [inputValue, setInputValue] = useState("");
  const searchQueryRef = useRef("");
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.searchQuery.value);

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
  return (
    <div className={"flex flex-row w-full"}>
      <input
        className={"w-full border-2 border-black"}
        type={"text"}
        onChange={(e) => handleSearchQueryChange(e.target.value)}
      ></input>
    </div>
  );
};

export default Navigation;
