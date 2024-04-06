import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user:null,
};


export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        login(state , action) {
            state.user = action.payload;
            localStorage.setItem("user-info" , JSON.stringify(action.payload));
            
        },
        logout(state) {
            state.user = null;
            localStorage.removeItem("user-info");
            
        }
    }
})

export const {login , logout} = userSlice.actions;




