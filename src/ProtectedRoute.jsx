import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {

    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    const currentTime = Date.now() / 1000;

    // Check token expiry
    if (payload.exp < currentTime) {

      localStorage.removeItem("token");

      return <Navigate to="/login" />;

    }

    // Role check
    if (role && payload.role !== role) {

      if (payload.role === "admin") {
        return <Navigate to="/admin-dashboard" />;
      }

      return <Navigate to="/dashboard" />;
    }

    return children;

  }

  catch {

    localStorage.removeItem("token");

    return <Navigate to="/login" />;

  }

}

export default ProtectedRoute;