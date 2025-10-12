import { Preloader } from '../ui/preloader/preloader';
import { useSelector } from '../../services/store';
import { Navigate, Outlet } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isAuthChecked } = useSelector((state) => state.user);
  // console.log(children);
  // if (!isAuthChecked) {
  //   return <Preloader />;
  // }
  // if (!user) {
  //   return <Navigate to='/login' />;
  // }
  return children;
};
