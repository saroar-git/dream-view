import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import { Fade } from 'react-awesome-reveal';
import { FaSpinner } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';

const MyClasses = () => {
      const { user } = useAuth();

      const { data: classes = [] } = useQuery(['userRole', user?.email], async () => {
            const res = await fetch(`https://dream-view-server-kappa.vercel.app/instructors/classes/${user?.email}`);
            return res.json();
      });
      
      return (
            <div className="w-full min-h-full px-4">
                  <Helmet>
                        <title>Dream View | My Classes</title>
                  </Helmet>

                  <div className="rounded my-10 md:my-20">
                        <div className="md:text-2xl uppercase md:pl-[52px] font-semibold flex gap-2">
                              <Fade delay={300} cascade damping={0.02}>My classes.. </Fade>
                        </div>

                        <div className="overflow-x-auto w-full mt-8">
                              <table className="table w-11/12 mx-auto">
                                    {/* head */}
                                    <thead>
                                          <tr className='text-white'>

                                                <th className="text-[17px] bg-[#004A6B] text-center rounded-l">Image</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center">Class Name</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center">Available Seats</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center">Price</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center">Total Enrolled</th>
                                                <th className="text-[20px] bg-[#004A6B] text-center">Status</th>
                                                <th className="text-[20px] bg-[#004A6B] text-center">Feedback</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center rounded-r">Actions</th>

                                          </tr>
                                    </thead>
                                    <tbody>
                                          {classes?.map(singleClass => <tr key={singleClass._id}>

                                                <td className='text-center'>
                                                      <div className="avatar">
                                                            <div className="mask w-16">
                                                                  <img src={singleClass.image} alt="Avatar" className='rounded-full' />
                                                            </div>
                                                      </div>
                                                </td>

                                                <td className='text-center font-semibold'>{singleClass.language} </td>
                                                <td className='text-center font-semibold'>{singleClass.available}</td>
                                                <td className='text-center font-semibold'>$ {singleClass.price}</td>
                                                <td className='text-center font-semibold'>{singleClass.enroll}</td>

                                                <td className="text-center">
                                                      {singleClass.status === 'denied' ? (
                                                            <span className="text-red-500 font-semibold">Denied</span>
                                                      ) : singleClass.status === 'approved' ? (
                                                            <span className="text-green-500 font-semibold">Approved</span>
                                                      ) : (
                                                            <span className="text-blue-500 font-semibold flex gap-1 items-center"><FaSpinner /> Pending</span>
                                                      )}
                                                </td>

                                                <td className='text-center font-semibold'>{singleClass.feedback ? singleClass.feedback : '...'}</td>

                                                <td className='text-center mt-5'>
                                                      <button className="btn-sm rounded btn hover:bg-[#004A6B] normal-case hover:text-white"><BiEdit className='text-blue-500' /> Update</button>
                                                </td>
                                          </tr>)}

                                    </tbody>

                              </table>
                        </div>
                  </div>
            </div>
      );
};

export default MyClasses;