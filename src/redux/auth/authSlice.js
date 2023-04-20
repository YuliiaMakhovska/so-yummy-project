import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  verification,
  login,
  fetchCurrentUser,
  logout,
} from './authOperations';

const initialState = {
  user: { name: null, email: null, avatarUrl: null, createdAt: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder

      //refister

      .addCase(register.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = null;
        console.log('Payload register', payload.user);
        state.user = payload.user;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      })

      //verification

      .addCase(verification.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(verification.fulfilled, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = null;
        state.isLoggedIn = true;
        console.log('Token in state slice', payload.token);
        console.log('State', state.isLoggedIn);
        state.token = payload.token;
      })
      .addCase(verification.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      })

      //login

      .addCase(login.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = null;
        state.isLoggedIn = true;
        state.user = payload.user;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      })

      //current user
      .addCase(fetchCurrentUser.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.error = null;
        state.isRefreshing = false;
        state.user = payload.user;
      })
      .addCase(fetchCurrentUser.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = null;
      })

      //logout

      .addCase(logout.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = null;
        state.isLoggedIn = false;
        state.token = null;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload;
      });
  },
});

export const authReducer = authSlice.reducer;
