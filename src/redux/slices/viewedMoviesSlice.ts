import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieData } from "@/types";

export type viewedMoviesState = {
  value: MovieData[];
};

const initialState: viewedMoviesState = {
  value: [],
};

const viewedMoviesSlice = createSlice({
  name: "viewedMovies",
  initialState: initialState,
  reducers: {
    setViewedMovies: (state, action: PayloadAction<MovieData[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setViewedMovies } = viewedMoviesSlice.actions;
export default viewedMoviesSlice.reducer;
