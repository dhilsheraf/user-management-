import { JSX } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

const PublicRoutee = ({children}:{children:JSX.Element}) => {
  const adminToken = localStorage.getItem('adminToken'); // Check if admin is logged in

  if (adminToken) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default PublicRoutee;
