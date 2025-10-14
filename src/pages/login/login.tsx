import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loadUser, loginUser } from '../../services/slices/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuthChecked);
  const loginError = useSelector((state) => state.user.error);
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(loadUser());
  // }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!email.trim() || !password.trim()) {
      setFormError('Email и пароль обязательны');
      return;
    }
    dispatch(loginUser({ email, password }));
  };
  const errorText = formError || loginError || '';
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
