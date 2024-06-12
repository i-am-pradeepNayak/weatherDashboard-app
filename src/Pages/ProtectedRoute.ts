import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}: ProtectedRouteProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/");
  }, [auth.isAuthenticated, navigate]);

  return auth.isAuthenticated ? children : null;
};

export default ProtectedRoute;
