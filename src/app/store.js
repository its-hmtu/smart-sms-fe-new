import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import campaignReducer from "@/features/campaign/campaignSlice";

const rootReducer = combineReducers({
  user: userReducer,
  campaign: campaignReducer
});

const store = configureStore({ reducer: rootReducer });
export default store;
