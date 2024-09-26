import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import { combineReducers } from 'redux';

// The legacy reducer (changeState)
const initialState = {
  sidebarShow: true,
  theme: 'light',
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    default:
      return state;
  }
};

// Combine both reducers into one
const rootReducer = combineReducers({
  auth: authReducer, // Redux Toolkit auth slice
  [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query API slice
  ui: changeState, // Legacy reducer for UI state (sidebar, theme, etc.)
});

// Configure store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Adding RTK Query middleware
  devTools: process.env.NODE_ENV !== 'production', // Enable DevTools in development
});

export default store;
