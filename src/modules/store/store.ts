/* NO NEED TO CHANGE THIS FILE */

import { configureStore } from "@reduxjs/toolkit";

import { TutorialReducer } from "./tutorial-reducer";

const reducer = {
  tutorial: TutorialReducer,
};

const preloadedState = {
  tutorial: {
    isVisible: false,
  },
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
  enhancers: [],
});
