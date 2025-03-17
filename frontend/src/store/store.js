import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlice";
import userReducer from "./slices/userSlice";
import applicationReducer from "./slices/applicationSlice";
import updateProfileReducer from "./slices/updateProfileSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // ✅ Local storage for persistence

// ✅ Persist the entire 'user' slice
const persistConfig = {
  key: "user",
  storage,
  whitelist: ["token", "user", "isAuthenticated"], // ✅ Ensure token & user data are stored
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer, // ✅ Persisted user reducer
    jobs: jobReducer,
    applications: applicationReducer,
    updateProfile: updateProfileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Prevent Redux Persist warnings
    }),
});

export const persistor = persistStore(store); // ✅ Persist store

export default store;
