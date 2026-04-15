import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const isGuest = localStorage.getItem("isGuest");
  
  if (!token && isGuest !== "true") {
    return <Navigate to="/login" replace />;
  }
  
  return children
}

export default ProtectedRoute;