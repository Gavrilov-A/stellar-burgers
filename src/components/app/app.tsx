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
import { replace, Route, Routes, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../routes/ProtectedRoute';

const App = () => {
  const navigate = useNavigate();
  const handelModalClose = () => {
    navigate(-1);
  };
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
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute onlyUnAuth>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute onlyUnAuth>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/feed:number'
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
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute onlyUnAuth>
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
      </Routes>
    </div>
  );
};

export default App;
