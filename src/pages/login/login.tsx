import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loadUser, loginUser } from '../../services/slices/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();
  const { loginUserError } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormError(undefined);
    if (!email.trim() || !password.trim()) {
      setFormError('Email и пароль обязательны');
      return;
    }
    dispatch(loginUser({ email: email, password: password }));
  };
  const errorText = formError || loginUserError || '';

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
