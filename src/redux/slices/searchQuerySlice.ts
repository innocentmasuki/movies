import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SearchQueryState = {
  value: string;
};

const initialState: SearchQueryState = {
  value: "",
};

const searchQuerySlice = createSlice({
  name: "searchQuery",
  initialState: initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchQuery } = searchQuerySlice.actions;
export default searchQuerySlice.reducer;
