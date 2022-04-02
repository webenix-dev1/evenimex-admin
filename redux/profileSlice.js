import { createSlice } from "@reduxjs/toolkit";

const initialStateObj = {
    profileImage: null,
    profileType: "renter",
};

export const profileSlice = createSlice({
    name: "profile",
    initialState: initialStateObj,
    reducers: {
        profileImageAction: (state, { payload }) => {
            state.profileImage = payload;
        },
        profileTypeAction: (state, { payload }) => {
            state.profileType = payload;
        },
    },
});

export const { profileImageAction, profileTypeAction } = profileSlice.actions;

//it behave like connector (old redux)
export const profileSelector = (state) => state.profile;

export default profileSlice.reducer;
