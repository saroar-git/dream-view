import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import { HashLoader } from "react-spinners";

const AdminRoute = ({ children }) => {
      const { user, loading } = useAuth();
      const [isAdmin, isAdminLoading] = useAdmin();
      const location = useLocation();

      if (loading || isAdminLoading) {
            return (
                  <div className='h-[70vh] flex flex-col justify-center items-center'>
                        <HashLoader size={100} className="text-[#004A6B]" />
                  </div>
            );
      }

      if (user && isAdmin) {
            return children;
      }
      else {
            return <Navigate to="/" state={{ from: location }} replace></Navigate>;
      }
};

export default AdminRoute;