import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Fade, Rotate } from 'react-awesome-reveal';

const Enrollments = () => {
      const { user, loading } = useAuth();
      const [axiosSecure] = useAxiosSecure();

      const { data: enrolled } = useQuery({
            queryKey: ['enrolled', user?.email],
            enabled: !loading,
            queryFn: async () => {
                  const res = await axiosSecure.get(`/payment/class/${user?.email}`);
                  return res.data;
            },
      });

      return (
            <div className="w-full min-h-full px-4">
                  <Helmet>
                        <title>Dream View | Enrolled Classes</title>
                  </Helmet>

                  <div className="rounded my-10 md:mt-20">
                        <div className="md:text-2xl uppercase md:pl-2 font-semibold flex gap-2">
                              <Fade delay={300} cascade damping={0.02}>Enrolled classes: </Fade>
                              <Rotate>{enrolled?.length}</Rotate>
                        </div>
                        <div className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-4'>
                              {enrolled?.map(course => (
                                    <div key={course._id} className="card bg-base-200 border-[1px] md:w-11/12 card-side justify-start items-center pl-3 shadow-xl">
                                          <figure className="py-3">
                                                <LazyLoadImage src={course.image} alt="course" className="rounded-lg w-52" effect="blur" loading='lazy' />
                                          </figure>
                                          <div className="card-body">
                                                <h2 className="card-title">Class: {course.class}</h2>

                                                <p className="text-start mt-1 text-[#004A6B] font-semibold">Instructor: {course.instructor}</p>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </div>
            </div>
      );
};

export default Enrollments;
