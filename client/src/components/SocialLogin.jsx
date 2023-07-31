import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-hot-toast";
import { saveUser } from "../apis/Auth";

const SocialLogin = () => {
      const { loginWithGoogle, setLoading } = useAuth();
      const navigate = useNavigate();
      const location = useLocation();

      const from = location.state?.from?.pathname || "/";

      const handleGoogleLogin = () => {
            loginWithGoogle()
                  .then(result => {
                        saveUser(result.user);
                        navigate(from, { replace: true });
                  })
                  .catch(error => {
                        setLoading(false);
                        toast.error(error.message);
                  });
      };

      return (

            <div className="text-center mb-4">
                  <div className="divider">or continue with</div>

                  <button onClick={handleGoogleLogin} className="border rounded-full p-3 border-[#004A6B] text-xl mx-4">
                        <FcGoogle />
                  </button>
            </div>
      );
};

export default SocialLogin;