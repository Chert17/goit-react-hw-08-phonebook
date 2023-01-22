import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import { login, logout, refresh, register } from './phonebookApi';
import {
  addContact,
  deleteContact,
  getContacts,
  updateContact,
} from './phonebookApi';
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};
const resetUser = () => initialState;
const authError = (state, { payload: { status } }) => {
  if (status === 401) {
    toast.error('Please authorization ');
    return initialState;
  }

  return state;
};
const authUser = (state, { payload }) => {
  state.user = payload.user;
  state.token = payload.token;
  state.isLoggedIn = true;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addMatcher(refresh.matchPending, (state, action) => {
        state.isRefreshing = true;
      })
      .addMatcher(register.matchFulfilled, authUser)
      .addMatcher(login.matchFulfilled, authUser)
      .addMatcher(refresh.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addMatcher(logout.matchFulfilled, resetUser)
      .addMatcher(logout.matchRejected, authError)
      .addMatcher(refresh.matchRejected, state => {
        state.token = null;
        state.isRefreshing = false;
      })
      .addMatcher(getContacts.matchRejected, authError)
      .addMatcher(addContact.matchRejected, authError)
      .addMatcher(updateContact.matchRejected, authError)
      .addMatcher(deleteContact.matchRejected, authError);
  },
});

// Persist
const persistConfig = {
  key: 'authUser',
  storage,
  whitelist: ['token'],
};

export const authSlicePersistedReducer = persistReducer(
  persistConfig,
  authSlice.reducer
);
