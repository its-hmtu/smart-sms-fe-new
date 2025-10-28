import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = () => {
  combineReducers({
    // Add reducers
  })
};

const store = configureStore({ reducer: rootReducer() });
export default store;
