import { configureStore } from "@reduxjs/toolkit";
import probetsApi from "./probetsApi";

const makeStore = () => {
  return configureStore({
    reducer: {
      [probetsApi.reducerPath]: probetsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(probetsApi.middleware),
  });
};
export default makeStore;
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
