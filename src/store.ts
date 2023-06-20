import { configureStore } from "@reduxjs/toolkit";
import { apiUsers } from "./services/apiSlice";

export default configureStore({
  reducer: {
    [apiUsers.reducerPath]: apiUsers.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiUsers.middleware),
});
