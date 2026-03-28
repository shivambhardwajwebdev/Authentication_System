import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { Navigate } from "react-router";

function ProtectedRoutes({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <h1>Loading...</h1>;

  if (!user) {
    return <Navigate to="/login" replace />; // ✅ correct way
  }

  return children;
}

export default ProtectedRoutes;