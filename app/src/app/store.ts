import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import orderReducer from "../features/order/orderSlice";

const preloadedState = () => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem("informations");
    if (storedData) {
      const { name } = JSON.parse(storedData);
      return {
        user: {
          username: name,
        },
      };
    }
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
  },
  preloadedState: preloadedState(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
