import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { apiUsers } from "./services/apiSlice";
import userInfoReducer from "./utils/userInfo";

const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  [apiUsers.reducerPath]: apiUsers.reducer,
});

export default configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiUsers.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
