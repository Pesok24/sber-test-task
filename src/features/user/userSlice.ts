import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../@types/common";
import { RootState } from "../../app/store";

const initialState: UserType = {
  name: "",
  status: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.status = true;
    },
    logoutUser: (state) => {
      state.name = ''
      state.status = false;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
