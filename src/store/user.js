import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
  },
  reducers: {
    addUser: (auth, action) => {
      auth.user = action.payload;
    },
  },
});

export default slice.reducer;
export const { addUser } = slice.actions;
