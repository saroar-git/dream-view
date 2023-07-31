import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TbFidgetSpinner } from 'react-icons/tb';
import { Helmet } from 'react-helmet-async';
import { saveUser } from '../../apis/Auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../../components/SocialLogin';

const Register = () => {
      const { handleSubmit, register, formState: { errors }, reset } = useForm();
      const { createUser, updateUserProfile, loading, setLoading } = useAuth();

      const navigate = useNavigate();
      const location = useLocation();
      const from = location.state?.from?.pathname || '/';

      // handle register
      const onSubmit = data => {
            const { name, email, password, confirm, image } = data;

            // Additional form validation and submission logic
            if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)) {
                  toast.error('Password must be at least 6 characters long with one number, one capital letter, and one special character');
                  return;
            } else if (password !== confirm) {
                  toast.error("Passwords didn't match");
                  return;
            }

            // image handle
            const formData = new FormData();
            formData.append('image', image[0]);

            const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_hosting}`;
            fetch(url, {
                  method: 'POST',
                  body: formData,
            })
                  .then(res => res.json())
                  .then(imageData => {
                        const imageUrl = imageData.data.display_url;

                        createUser(email, password)
                              .then(result => {

                                    updateUserProfile(result.user, name, imageUrl)
                                          .then(() => {
                                                toast.success('Register successful');
                                                reset();
                                                saveUser(result.user);

                                                navigate(from, { replace: true });
                                          })
                                          .catch(err => {
                                                setLoading(false);
                                                toast.error(err.message);
                                          });
                              })
                              .catch(err => {
                                    setLoading(false);
                                    toast.error(err.message);
                              });
                  })
                  .catch(err => {
                        setLoading(false);
                        toast.error(err.message);
                  });
            return;
      };

      return (
            <div className='flex justify-center items-center pt-32 mb-10'>
                  <Helmet><title>Dream View | Register</title></Helmet>

                  <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900 shadow-sm border-[1px] border-[#004A6B]'>
                        <div className='mb-8 text-center'>
                              <h1 className='text-4xl font-bold'>Register</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate className='space-y-6 ng-untouched ng-pristine ng-valid'>
                              <div className='space-y-4'>
                                    <div>
                                          <label htmlFor='name' className='block mb-2 text-sm'>
                                                Name
                                          </label>
                                          <input
                                                type='text'
                                                name='name'
                                                id='name'
                                                placeholder='Your Name'
                                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#004A6B] bg-gray-200 text-gray-900'
                                                {...register('name', { required: true })}
                                          />
                                          {errors.name && <span className='text-red-500'>This field is required</span>}
                                    </div>
                                    <div>
                                          <label htmlFor='image' className='block mb-2 text-sm'>
                                                Select Image:
                                          </label>
                                          <input
                                                required
                                                type='file'
                                                id='image'
                                                name='image'
                                                accept='image/*'
                                                {...register('image', { required: true })}
                                          />
                                          {errors.image && <span className='text-red-500'>This field is required</span>}
                                    </div>
                                    <div>
                                          <label htmlFor='email' className='block mb-2 text-sm'>
                                                Email address
                                          </label>
                                          <input
                                                type='email'
                                                name='email'
                                                id='email'
                                                required
                                                placeholder='Your Email'
                                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#004A6B] bg-gray-200 text-gray-900'
                                                {...register('email', { required: true })}
                                          />
                                          {errors.email && <span className='text-red-500'>This field is required</span>}
                                    </div>
                                    <div>
                                          <div className='flex justify-between'>
                                                <label htmlFor='password' className='text-sm mb-2'>
                                                      Password
                                                </label>
                                          </div>
                                          <input
                                                type='password'
                                                name='password'
                                                id='password'
                                                required
                                                placeholder='*******'
                                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#004A6B] bg-gray-200 text-gray-900'
                                                {...register('password', { required: true })}
                                          />
                                          {errors.password && <span className='text-red-500'>This field is required</span>}
                                    </div>
                                    <div>
                                          <div className='flex justify-between'>
                                                <label htmlFor='confirm' className='text-sm mb-2'>
                                                      Confirm Password
                                                </label>
                                          </div>
                                          <input
                                                type='password'
                                                name='confirm'
                                                id='confirm'
                                                required
                                                placeholder='*******'
                                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#004A6B] bg-gray-200 text-gray-900'
                                                {...register('confirm', { required: true })}
                                          />
                                          {errors.confirm && <span className='text-red-500'>This field is required</span>}
                                    </div>
                              </div>

                              <div>
                                    <button
                                          type='submit'
                                          className='bg-[#004A6B] w-full rounded-md py-3 text-white'
                                    >
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
                              Already have an account?
                              <Link to='/login' className='hover:underline hover:text-[#004A6B] text-gray-600'> Login</Link>.
                        </p>
                  </div>
            </div>
      );
};

export default Register;
