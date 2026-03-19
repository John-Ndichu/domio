import { configureStore } from "@reduxjs/toolkit";
import propertiesReducer from "./slices/propertiesSlice";
import { uiReducer, favoritesReducer } from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    ui: uiReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;