import { Navigate, useLocation } from "react-router-dom";

function AdminRoute({ children, user }) {
  const location = useLocation();

  if (!user || user.role !== 'admin') {
    // Redirect to login or no access page if not admin
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
export default AdminRoute;