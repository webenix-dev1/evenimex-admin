import { createSlice } from "@reduxjs/toolkit";

const initialStateObj = {
    boatId: null,
};

export const boatRegisterSlice = createSlice({
    name: "boatRegister",
    initialState: initialStateObj,
    reducers: {
        boatIdAction: (state, { payload }) => {
            state.boatId = payload;
        },
        resetFormAction: (state, { payload }) => {
            state.boatId = null;
        },
    },
});

export const { boatIdAction, resetFormAction } = boatRegisterSlice.actions;

//it behave like connector (old redux)
export const boatRegisterSelector = (state) => state.boatRegister;

export default boatRegisterSlice.reducer;
