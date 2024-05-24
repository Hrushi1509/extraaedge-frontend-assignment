import { configureStore } from "@reduxjs/toolkit";
import  userData  from "./features/usersSlice";
import modalSlice from "./features/modalSlice";

export const store = configureStore({
    reducer: {
        app: userData,
        modal: modalSlice
    }
})