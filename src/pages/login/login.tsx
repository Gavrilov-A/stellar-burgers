import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearUserError,
  loadUser,
  loginUser
} from '../../services/slices/userSlice';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorForm, setErrorForm] = useState('');
  const dispatch = useDispatch();
  const { loginUserError } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from;

  useEffect(() => {
    dispatch(clearUserError());
    setErrorForm('');
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorForm('');
    if (!email || !password) {
      setErrorForm('Email и пароль обязательны');
      return;
    }
    dispatch(loginUser({ email: email, password: password }))
      .then(() => {
        if (from) {
          navigate(from || '/');
        }
      })
      .catch((error) => {
        setErrorForm('Неверные данные');
      });
  };
  const errorText = errorForm || loginUserError;

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
