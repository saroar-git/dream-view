import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../components/SocialLogin";
import { TbFidgetSpinner } from 'react-icons/tb';
import { Helmet } from "react-helmet-async";
import { saveUser } from "../../apis/Auth";
import { useForm } from "react-hook-form";

const Login = () => {
      const { login, loading, setLoading } = useAuth();
      const navigate = useNavigate();
      const location = useLocation();
      const from = location.state?.from?.pathname || '/';
      const { register, handleSubmit, formState: { errors }, reset } = useForm();

      const onSubmit = data => {
            const email = data.email;
            const password = data.password;

            setLoading(true);

            login(email, password)
                  .then(result => {
                        toast.success('Login Successful');
                        saveUser(result.user);
                        setLoading(false);
                        reset();
                        navigate(from, { replace: true });
                  })
                  .catch(error => {
                        setLoading(false);
                        toast.error(error.message);
                  });
      };

      return (
            <div className='flex justify-center items-center pt-32 mb-10'>
                  <Helmet><title>Dream View | Login</title></Helmet>
                  <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900 shadow-sm border-[1px] border-[#004A6B]'>
                        <div className='mb-8 text-center'>
                              <h1 className='text-4xl font-bold'>Login</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 ng-untouched ng-pristine ng-valid'>
                              <div className='space-y-4'>
                                    <div>
                                          <label htmlFor='email' className='block mb-2 text-sm'>Email address</label>
                                          <input
                                                type='email'
                                                {...register("email", { required: true })}
                                                placeholder='Enter Your Email Here'
                                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#004A6B] bg-gray-200 text-gray-900'
                                                data-temp-mail-org='0'
                                          />
                                          {errors.email && <span className="text-red-500">Email is required</span>}
                                    </div>
                                    <div>
                                          <div className='flex justify-between'>
                                                <label htmlFor='password' className='text-sm mb-2'>Password</label>
                                          </div>
                                          <input
                                                type='password'
                                                {...register("password", { required: true })}
                                                placeholder='*******'
                                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#004A6B] bg-gray-200 text-gray-900'
                                          />
                                          {errors.password && <span className="text-red-500">Password is required</span>}
                                    </div>
                              </div>
                              <div>
                                    <button type='submit' className='bg-[#004A6B] w-full rounded-md py-3 text-white'>
                                          {loading ? (
                                                <TbFidgetSpinner className='m-auto animate-spin' size={24} />
                                          ) : (
                                                'Continue'
                                          )}
                                    </button>
                              </div>
                        </form>
                        <SocialLogin />
                        <p className='px-6 text-sm text-center text-gray-500'>
                              Don't have an account yet?
                              <Link to='/register' className='hover:underline hover:text-[#004A6B] text-gray-600'>Register Now</Link>.
                        </p>
                  </div>
            </div>
      );
};

export default Login;