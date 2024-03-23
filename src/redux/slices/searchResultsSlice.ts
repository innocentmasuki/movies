import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieData } from "@/types";

export type SearchResultsState = {
  value: MovieData[];
};

const initialState: SearchResultsState = {
  value: [],
};

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState: initialState,
  reducers: {
    setSearchResult: (state, action: PayloadAction<MovieData[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchResult } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;
