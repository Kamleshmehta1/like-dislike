import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import { api } from './apiInterceptor';

const combinedReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  authSlice,
});

const rootReducer = (state, action) => combinedReducer(state, action);

export { rootReducer };
