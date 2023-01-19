import { configureStore } from "@reduxjs/toolkit";
import FormReducer from "./form";

export const store = configureStore({
    reducer: {
        forms: FormReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
