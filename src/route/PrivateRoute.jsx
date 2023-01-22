import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectToken } from 'redux/authSelectors';

export function PrivateRouter({ component: Component, redirectTo = '/' }) {
  const token = useSelector(selectToken);
  return !token ? <Navigate to={redirectTo} /> : Component;
}
