import { FC, useEffect } from 'react';
import { AppHeaderUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { loadUser } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector((state) => state.user.user);
  return <AppHeaderUI userName={userName?.name} />;
};
