import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import { HashLoader } from 'react-spinners';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className='h-[70vh] flex flex-col justify-center items-center'>
      <HashLoader size={100} className="text-[#004A6B]" />
    </div>;
  }

  if (user) {
    return children;
  }
  return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
