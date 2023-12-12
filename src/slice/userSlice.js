import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user:null,
};

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        login(state) {
            state.user = localStorage.getItem("user-info");
        },
        logout(state) {
            localStorage.removeItem("user-info");
            state.user = null;
        }
    }
})

export const {login , logout} = userSlice.actions;




