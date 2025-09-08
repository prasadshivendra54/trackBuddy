import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import habitReducer from "./slices/habitSlice";

// Redux store configuration (here we combine all slices (auth + habits) into one global store)
const store = configureStore({
  reducer: {
    auth: authReducer,   // user authentication (Server site )
    habits: habitReducer // handle habit tracking state, (Client site)
  },
});

// RootState full state object of the store
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch correct type for dispatch function
export type AppDispatch = typeof store.dispatch;

export default store;
