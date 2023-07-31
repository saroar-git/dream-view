import useAuth from '../hooks/useAuth';
import useInstructor from '../hooks/useInstructor';
import { Navigate, useLocation } from 'react-router-dom';
import { HashLoader } from "react-spinners";

const InstructorRoute = ({ children }) => {
      const { user, loading } = useAuth();
      const [isInstructor, isInstructorLoading] = useInstructor();
      const location = useLocation();

      if (loading || isInstructorLoading) {
            return (
                  <div className='h-[70vh] flex flex-col justify-center items-center'>
                        <HashLoader size={100} className="text-[#004A6B]" />
                  </div>
            );
      }

      if (user && isInstructor) {
            return children;
      }
      else {
            return <Navigate to="/" state={{ from: location }} replace></Navigate>;
      }
};

export default InstructorRoute;