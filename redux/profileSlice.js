import { createSlice } from "@reduxjs/toolkit";

const initialStateObj = {
  userData: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: initialStateObj,
  reducers: {
    setProfileData: (state, { payload }) => {
      state.userData = payload;
    },
    removeProfileData: (state, { payload }) => {
      state.userData = null;
    },
  },
});

export const { setProfileData, removeProfileData } = profileSlice.actions;

//it behave like connector (old redux)
export const profileSelector = (state) => state.profile;

export default profileSlice.reducer;
