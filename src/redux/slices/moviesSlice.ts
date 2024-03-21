import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieData } from "@/types";

export type MoviesState = {
  value: MovieData[];
};

const initialState: MoviesState = {
  value: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<MovieData[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
