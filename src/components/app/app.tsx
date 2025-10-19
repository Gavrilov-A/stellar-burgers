import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  replace,
  Route,
  Routes,
  useNavigate,
  useParams
} from 'react-router-dom';
import { ProtectedRoute } from '../routes/ProtectedRoute';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { loadUser } from '../../services/slices/userSlice';
import { clearOrder } from '../../services/slices/orderSlice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handelModalClose = () => {
    dispatch(clearOrder());
    navigate(-1);
  };
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <Modal
                title=''
                onClose={() => {
                  handelModalClose();
                }}
              >
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />

        <Route
          path='/feed/:number'
          element={
            <Modal
              title=''
              onClose={() => {
                handelModalClose();
              }}
            >
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title='Детали ингредиента'
              onClose={() => handelModalClose()}
            >
              <IngredientDetails />
            </Modal>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
