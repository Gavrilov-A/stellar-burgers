import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export const registerUser = createAsyncThunk<TUser, TRegisterData>(
  'user/register',
  async (userData: TRegisterData) => {
    const response = await registerUserApi(userData);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response.user;
  }
);

export const loginUser = createAsyncThunk<TUser, TLoginData>(
  'user/login',
  async (loginData: TLoginData) => {
    const response = await loginUserApi(loginData);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response.user;
  }
);

export const loadUser = createAsyncThunk<TUser, void>('user/load', async () => {
  const response = await getUserApi();
  return response.user;
});

export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/update',
  async (userData: Partial<TRegisterData>) => {
    const response = await updateUserApi(userData);
    return response.user;
  }
);

export const logoutUser = createAsyncThunk<void, void>(
  'user/logout',
  async () => {
    await logoutApi();
    localStorage.removeItem('refreshToken');
    setCookie('accessToken', '');
  }
);

const handleAuthError = (state: UserState, error: string) => {
  state.isAuthChecked = false;
  state.isLoading = false;
  state.error = error;
};

const handleLoadingStart = (state: UserState) => {
  state.isAuthChecked = false;
  state.isLoading = true;
  state.error = null;
};

const handleSuccess = (state: UserState) => {
  state.isAuthChecked = true;
  state.isLoading = false;
  state.error = null;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Регистрация
      .addCase(registerUser.pending, handleLoadingStart)
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.user = action.payload;
          handleSuccess(state);
        }
      )
      .addCase(registerUser.rejected, (state) => {
        handleAuthError(state, 'Error not found');
      })
      //Авторизация
      .addCase(loginUser.pending, handleLoadingStart)
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        handleSuccess(state);
      })
      .addCase(loginUser.rejected, (state) => {
        handleAuthError(state, 'Email и пароль обязательны');
      })
      //Загрузка пользователя
      .addCase(loadUser.pending, handleLoadingStart)
      .addCase(loadUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        handleSuccess(state);
      })
      .addCase(loadUser.rejected, (state) => {
        handleAuthError(state, 'Error not found');
      })
      //Обновление данных
      .addCase(updateUser.pending, handleLoadingStart)
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        handleSuccess(state);
      })
      .addCase(updateUser.rejected, (state) => {
        handleAuthError(state, 'Error not found');
      })
      //Выход
      .addCase(logoutUser.pending, handleLoadingStart)
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        handleAuthError(state, 'Error not found');
      });
  }
});

export default userSlice;
