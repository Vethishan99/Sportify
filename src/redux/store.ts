import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import favoritesReducer from "./slices/favoritesSlice";
import matchesReducer from "./slices/matchesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    matches: matchesReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ["favorites/loadFavorites/fulfilled"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
