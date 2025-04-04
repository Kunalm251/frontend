import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, loading, user } = useSelector(state => state.auth);
  
  if (loading) return <div>Loading...</div>;
  
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  if (adminOnly && !user?.isAdmin) return <Navigate to="/" />;
  
  return children;
};

export default PrivateRoute;