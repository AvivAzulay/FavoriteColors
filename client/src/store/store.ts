import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./reducers/app.reducer";

export const store = configureStore({
  reducer: {
    appModule: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
