import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth from "./features/auth/authSlice";
import user from "./features/user/userSlice";
import role from "./features/roles/roleSlice";
import developer from "./features/developer/developerSlice";
import product from "./features//products/productSlice";

const persistedAuth = persistReducer({ key: "auth", storage }, auth);

export const store = configureStore({
  reducer: {
    auth: persistedAuth,
    user,
    role,
    developer,
    product,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
