import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import exceptionReducer from './exceptionSlice';
import authenticationReducer from './authenticationSlice';


const reducer = {
  exceptions: exceptionReducer,
  authentication: authenticationReducer,
};

const persistedState = localStorage.getItem("reduxState") ? JSON.parse(localStorage.getItem("reduxState") ?? "") : {};

export const store = configureStore({
  reducer,
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }),
});

store.subscribe(() => {
  // Saves in the local storage only the auth state;
  const storeObj = {
    authentication: store.getState().authentication,
    exceptions: {},
  }
  localStorage.setItem("reduxState", JSON.stringify(storeObj));
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export * from './authenticationSlice';
export * from './exceptionSlice';
