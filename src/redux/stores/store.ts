import { configureStore } from "@reduxjs/toolkit";
import searchQueryReducer from "@/redux/slices/searchQuerySlice.ts";
import moviesReducer from "@/redux/slices/moviesSlice.ts";
import searchResultsReducer from "@/redux/slices/searchResultsSlice.ts";
import viewedMoviesReducer from "@/redux/slices/viewedMoviesSlice.ts";

export const store = configureStore({
  reducer: {
    searchQuery: searchQueryReducer,
    movies: moviesReducer,
    searchResults: searchResultsReducer,
    viewedMovies: viewedMoviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
