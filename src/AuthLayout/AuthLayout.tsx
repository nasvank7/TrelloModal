import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
interface ProtectedRouteProps {
    children: React.ReactNode; 
  }
const ProtectedRoute: React.FC<ProtectedRouteProps>  = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('jwt'); 

  if (!isAuthenticated) {
   
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
