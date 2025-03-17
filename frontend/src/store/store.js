import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlice";
import userReducer from "./slices/userSlice";
import applicationReducer from "./slices/applicationSlice";
import updateProfileReducer from "./slices/updateProfileSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // ✅ Uses local storage

// ✅ Persist configuration for user slice
const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "token", "isAuthenticated"], // ✅ Persist authentication-related data
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
      serializableCheck: false, // ✅ Prevents Redux Persist warnings
    }),
});

export const persistor = persistStore(store); // ✅ Creates persisted store
export default store;
