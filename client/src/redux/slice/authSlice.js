import { createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/handleCookie';
import { authApi } from '../action/authAction';

const isToken = !!getCookie('accessToken') || !!getCookie('refreshToken');

const initialState = { isAuthenticated: isToken || false, profileDetails: {} };

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    authentication: (state, action) => {
      const { isAuthenticated } = action.payload;
      state.isAuthenticated = isAuthenticated;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.profile.matchFulfilled,
      (state, action) => {
        state.profileDetails = action?.payload?.data;
      }
    );
  },
});

export const { authentication, profileDetails } = authSlice.actions;

export default authSlice.reducer;
