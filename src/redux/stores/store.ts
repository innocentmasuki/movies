import { configureStore } from "@reduxjs/toolkit";
import searchQueryReducer from "@/redux/slices/searchQuerySlice.ts";
import moviesReducer from "@/redux/slices/moviesSlice.ts";

export const store = configureStore({
  reducer: {
    searchQuery: searchQueryReducer,
    movies: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
