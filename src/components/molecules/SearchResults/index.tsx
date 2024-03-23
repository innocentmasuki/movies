import { useAppSelector } from "@/hooks/storeHooks.ts";

const SearchResults = () => {
  const searchQuery = useAppSelector((state) => state.searchQuery.value);

  return (
    <div>
      <h1>Results for: {searchQuery}</h1>
    </div>
  );
};
export default SearchResults;
