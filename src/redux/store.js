import { configureStore } from '@reduxjs/toolkit';
import { phonebookApi } from './phonebookApi';
import { filterSlice } from './filterSlice';
import { authSlicePersistedReducer } from './authSlice';

import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

export const store = configureStore({
  reducer: {
    [phonebookApi.reducerPath]: phonebookApi.reducer,
    filter: filterSlice.reducer,
    auth: authSlicePersistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(phonebookApi.middleware),
});

export const persistor = persistStore(store);
