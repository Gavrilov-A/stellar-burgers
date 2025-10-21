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
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';

interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginUserError: string | undefined;
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  isAuthenticated: false,
  isLoading: false,
  loginUserError: undefined
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
  'user/logoutUser',
  async () => {
    logoutApi()
      .then(() => {
        localStorage.clear();
        deleteCookie('accessToken');
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      });
  }
);

const handleLoadingStart = (state: UserState) => {
  state.isLoading = true;
  state.loginUserError = undefined;
};

const handleSuccess = (state: UserState) => {
  state.isAuthChecked = true;
  state.isAuthenticated = true;
  state.isLoading = false;
  state.loginUserError = undefined;
};
const handleAuthError = (state: UserState, error: string) => {
  state.isAuthChecked = true;
  state.isLoading = false;
  state.loginUserError = error;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.loginUserError = undefined;
    }
  },
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
        handleAuthError(state, 'Пользователь не зарегистрирован');
      })
      //Авторизация
      .addCase(loginUser.pending, handleLoadingStart)
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        handleSuccess(state);
      })
      .addCase(loginUser.rejected, (state) => {
        handleAuthError(state, 'Неправильный email или пароль');
      })
      //Загрузка пользователя
      .addCase(loadUser.pending, handleLoadingStart)
      .addCase(loadUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        handleSuccess(state);
      })
      .addCase(loadUser.rejected, (state) => {
        handleAuthError(state, '');
      })
      //Обновление данных
      .addCase(updateUser.pending, handleLoadingStart)
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        handleSuccess(state);
      })
      .addCase(updateUser.rejected, (state) => {
        handleAuthError(state, 'Данные не обновлены');
      })
      //Выход
      .addCase(logoutUser.pending, handleLoadingStart)
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        handleAuthError(state, 'Выход не выполнен');
      });
  }
});

export const { clearUserError } = userSlice.actions;
export default userSlice;
