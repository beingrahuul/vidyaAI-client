import { Navigate } from 'react-router-dom';

const isTokenValid = () => {
  const token = localStorage.getItem('token'); 
  return !!token; 
};

const PrivateRoute = ({ children }) => {
  return isTokenValid() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;