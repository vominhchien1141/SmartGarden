import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import webSocketReducer from './webSocketSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        webSocket: webSocketReducer,
    },
});

export default store;