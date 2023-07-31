import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import { Fade, Rotate } from 'react-awesome-reveal';

const PaymentHistory = () => {
      const { user, loading } = useAuth();
      const [axiosSecure] = useAxiosSecure();

      const { data: payments } = useQuery({
            queryKey: ['payments', user?.email],
            enabled: !loading,
            queryFn: async () => {
                  const res = await axiosSecure.get(`/payment/${user?.email}`);
                  return res.data;
            },
      });
      const sortedPayments = payments?.sort((a, b) => new Date(b.date) - new Date(a.date));

      return (
            <div className="w-full min-h-full px-4">
                  <Helmet>
                        <title>Dream View | Payment History</title>
                  </Helmet>

                  <div className="rounded my-10 md:mt-20">
                        <div className="md:text-2xl uppercase md:pl-[52px] font-semibold flex gap-2">
                              <Fade delay={300} cascade damping={0.02}>Total Payments: </Fade>
                              <Rotate>{payments?.length}</Rotate>
                        </div>
                  </div>

                  <div className="overflow-x-auto w-full mt-8">
                        <table className="table table-zebra w-11/12 mx-auto">
                              {/* head */}
                              <thead>
                                    <tr className="text-white">
                                          <th className="text-[20px] bg-[#004A6B] text-center rounded-l">#</th>
                                          <th className="text-[17px] bg-[#004A6B] text-center">Image</th>
                                          <th className="text-[17px] bg-[#004A6B] text-center">Class Name</th>
                                          <th className="text-[17px] bg-[#004A6B] text-center">Class Instructor</th>
                                          <th className="text-[17px] bg-[#004A6B] text-center">Total Price</th>
                                          <th className="text-[17px] bg-[#004A6B] text-center">Date & Time</th>
                                          <th className="text-[17px] bg-[#004A6B] text-center rounded-r">Transitions ID</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {sortedPayments?.map((payment, index) => (
                                          <tr key={index}>
                                                <th className="text-center">{index + 1}</th>

                                                <td className="text-center">
                                                      <div className="avatar">
                                                            <div className="mask w-16">
                                                                  <img src={payment.classImage[0]} alt="Avatar" className="rounded-md" />
                                                            </div>
                                                      </div>
                                                </td>

                                                <td className="text-center font-semibold">{payment.className[0]}</td>
                                                <td className="text-center font-semibold">{payment.instructor}</td>

                                                <td className="text-center font-semibold">$ {payment.price}</td>
                                                <td className="text-center font-semibold">{payment.date}</td>
                                                <td className="text-center font-semibold text-[#004A6B]">{payment.transactionId}</td>

                                          </tr>
                                    ))}
                              </tbody>
                        </table>
                  </div>
                  
            </div>
      );
};

export default PaymentHistory;