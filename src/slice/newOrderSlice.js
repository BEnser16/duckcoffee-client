import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isNewOrder: false,
};

// 設定點餐狀態的reducer 如果有新點餐就設定isNewOrder為true
export const newOrderSlice = createSlice({
    name:"newOrder",
    initialState,
    reducers:{
        setNewOrder(state) {
            state.isNewOrder = true;
        },
        clearNewOrder(state) {
            state.isNewOrder = false;
        }
    }
})

export const {setNewOrder , clearNewOrder} = newOrderSlice.actions;
