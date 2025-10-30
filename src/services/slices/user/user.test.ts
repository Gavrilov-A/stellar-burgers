import userSlice, { loadUser, loginUser, logoutUser, registerUser, updateUser, UserState } from './userSlice';
const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  isAuthenticated: false,
  isLoading: false,
  loginUserError: undefined
};
const mokUser = {
  email: 'blockjok@ya.ru',
  name: 'Андрей'
};

describe('Тест userSlice экшена registerUser', () => {
  it('Pending', () => {
    const state = userSlice.reducer(initialState, {
      type: registerUser.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.loginUserError).toBe(undefined);
    expect(state.user).toEqual(null);
  });

  it('Fulfilled', () => {
    const state = userSlice.reducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: mokUser
    });

    expect(state.isLoading).toBe(false);
    expect(state.loginUserError).toBe(undefined);
    expect(state.user).toEqual(mokUser);
  });

  it('Rejected', () => {
    const state = userSlice.reducer(initialState, {
      type: registerUser.rejected.type
    });

    expect(state.isLoading).toBe(false);
    expect(state.loginUserError).toBe('Пользователь не зарегистрирован');
    expect(state.user).toEqual(null);
  });
});

describe('Тест userSlice экшена loginUser', () => {
  it('Pending', () => {
    const state = userSlice.reducer(initialState, {
      type: loginUser.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.loginUserError).toBe(undefined);
  });

  it('Fulfilled', () => {
    const state = userSlice.reducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: mokUser
    });

    expect(state.isAuthChecked).toBe(true);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.loginUserError).toBe(undefined);
    expect(state.user).toEqual(mokUser);
  });

  it('Rejected', () => {
    const state = userSlice.reducer(initialState, {
      type: loginUser.rejected.type
    });

    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.loginUserError).toBe('Неправильный email или пароль');
    expect(state.user).toEqual(null);
  });
});

describe('Тест userSlice экшена loadUser', () => {
  it('Pending', () => {
    const state = userSlice.reducer(initialState, {
      type: loadUser.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.loginUserError).toBe(undefined);
  });

  it('Fulfilled', () => {
    const state = userSlice.reducer(initialState, {
      type: loadUser.fulfilled.type,
      payload: mokUser
    });

    expect(state.isAuthChecked).toBe(true);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.loginUserError).toBe(undefined);
    expect(state.user).toEqual(mokUser);
  });

  it('Rejected', () => {
    const state = userSlice.reducer(initialState, {
      type: loadUser.rejected.type
    });

    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.loginUserError).toBe('Пользователь не найден');
    expect(state.user).toEqual(null);
  });
});

describe('Тест userSlice экшена updateUser', () => {
  it('Pending', () => {
    const state = userSlice.reducer(initialState, {
      type: updateUser.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.loginUserError).toBe(undefined);
  });

  it('Fulfilled', () => {
    const state = userSlice.reducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: mokUser
    });

    expect(state.isAuthChecked).toBe(true);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.loginUserError).toBe(undefined);
    expect(state.user).toEqual(mokUser);
  });

  it('Rejected', () => {
    const state = userSlice.reducer(initialState, {
      type: updateUser.rejected.type
    });

    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.loginUserError).toBe('Данные не обновлены');
    expect(state.user).toEqual(null);
  });
});

describe('Тест userSlice экшена updateUser', () => {
  it('Pending', () => {
    const state = userSlice.reducer(initialState, {
      type: logoutUser.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.loginUserError).toBe(undefined);
  });

  it('Fulfilled', () => {
    const state = userSlice.reducer(initialState, {
      type: logoutUser.fulfilled.type,
      payload: mokUser
    });

    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toEqual(null);
  });

  it('Rejected', () => {
    const state = userSlice.reducer(initialState, {
      type: logoutUser.rejected.type
    });

    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.loginUserError).toBe('Выход не выполнен');
    expect(state.user).toEqual(null);
  });
});