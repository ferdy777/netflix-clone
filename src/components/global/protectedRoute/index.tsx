import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext"; // Corrected hook name

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth(); // Corrected hook name

  if (!user) {
    // Redirect to login page if no user is found
    return <Navigate to="/login" />;
  } else {
    // Render children (Account page) if user exists
    return <>{children}</>;
  }
};

export default ProtectedRoute;
