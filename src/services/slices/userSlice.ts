import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '@api';
import { TUser } from '@utils-types';
import { setCookie, getCookie } from '../../utils/cookie';

interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

export const registerUser = createAsyncThunk<
  TUser,
  TRegisterData,
  { rejectValue: string }
>('user/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await registerUserApi(userData);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response.user;
  } catch (err: any) {
    return rejectWithValue(err.message || 'Registration failed');
  }
});

export const loginUser = createAsyncThunk<
  TUser,
  TLoginData,
  { rejectValue: string }
>('user/login', async (loginData, { rejectWithValue }) => {
  try {
    const response = await loginUserApi(loginData);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response.user;
  } catch (err: any) {
    return rejectWithValue(err.message || 'Login failed');
  }
});

export const loadUser = createAsyncThunk<TUser, void, { rejectValue: string }>(
  'user/load',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (err: any) {
      return rejectWithValue('Not authenticated');
    }
  }
);

export const updateUser = createAsyncThunk<
  TUser,
  Partial<TRegisterData>,
  { rejectValue: string }
>('user/update', async (userData, { rejectWithValue }) => {
  try {
    const response = await updateUserApi(userData);
    return response.user;
  } catch (err: any) {
    return rejectWithValue(err.message || 'Update failed');
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      localStorage.removeItem('refreshToken');
      setCookie('accessToken', '');
    } catch (err: any) {
      return rejectWithValue(err.message || 'Logout failed');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthChecked = false;
        state.isLoading = false;
        state.error = action.payload || 'Error';
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(loadUser.rejected, (state) => {
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      });
  }
});

export default userSlice;
