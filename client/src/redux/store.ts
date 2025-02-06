import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducer";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [userReducer.name]: userReducer.reducer,
    },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;