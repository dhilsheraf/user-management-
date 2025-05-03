import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { JSX } from "react";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const user = useSelector((state: RootState) => state.user.user);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
