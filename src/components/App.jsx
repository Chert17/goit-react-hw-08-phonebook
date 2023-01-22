import { lazy, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectIsLoggedIn, selectToken } from 'redux/authSelectors';
import { useLazyRefreshQuery } from 'redux/phonebookApi';
import { PrivateRouter } from 'route/PrivateRoute';
import { PublicRouter } from 'route/PuplicRoute';

import Header from './Header/Header';
const LogInPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const ContactsPage = lazy(() => import('../pages/ContactsPage'));

export const App = () => {
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [RefreshToken] = useLazyRefreshQuery();

  useEffect(() => {
    if (token && !isLoggedIn) RefreshToken();
  }, [RefreshToken, token, isLoggedIn]);

  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route index element={<Navigate to={'/login'} />} />
          <Route
            path="/login"
            element={
              <PublicRouter redirectTo="/contacts" component={<LogInPage />} />
            }
          />
          <Route
            path="/register"
            element={
              <PublicRouter
                redirectTo="/contacts"
                component={<RegisterPage />}
              />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRouter redirectTo="/login" component={<ContactsPage />} />
            }
          />
          <Route path="*" element={<Navigate to={'/login'} />} />
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" theme="colored" autoClose={1000} />
    </>
  );
};
