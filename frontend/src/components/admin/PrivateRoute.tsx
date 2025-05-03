import {  JSX } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({children}:{children:JSX.Element}) => {
  const adminToken = localStorage.getItem('adminToken'); 
  if (!adminToken) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default PrivateRoute;
