import { useAppSelector } from "@/hooks/storeHooks.ts";
import Movies from "@/components/molecules/Movies";

const SearchResults = () => {
  const searchQuery = useAppSelector((state) => state.searchQuery.value);
  const searchResults = useAppSelector((state) => state.searchResults.value);

  return (
    <div>
      <h1 className={"text-white text-2xl font-bold my-4 md:my-6 md:text-3xl"}>
        {searchResults.length} results for: {searchQuery}
      </h1>
      <Movies movies={searchResults} smallCards listView />
    </div>
  );
};
export default SearchResults;
