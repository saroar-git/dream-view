import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Bounce, Fade } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { FcApproval } from 'react-icons/fc';
import { MdFeedback, MdOutlineDoNotDisturbOff } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ManageClasses = () => {
      const { data: classes = [], refetch } = useQuery(['classes'], async () => {
            const res = await fetch('https://dream-view-server-kappa.vercel.app/classes');
            const data = await res.json();
            return data;
      });

      const sortedClasses = [...classes].sort((a, b) => {
            if (a.status > b.status) {
                  return -1;
            }
            if (a.status < b.status) {
                  return 1;
            }
            return 0;
      });

      const handleApprove = singleClass => {
            fetch(`https://dream-view-server-kappa.vercel.app/classes/${singleClass._id}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ status: "approved" })
            })
                  .then(res => res.json())
                  .then(data => {
                        if (data.modifiedCount) {
                              refetch();
                              toast.success(`${singleClass?.language} class is Approved!`);
                        }
                  });
      };

      const handleDeny = singleClass => {
            fetch(`https://dream-view-server-kappa.vercel.app/classes/${singleClass._id}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ status: "denied" })
            })
                  .then(res => res.json())
                  .then(data => {
                        if (data.modifiedCount) {
                              refetch();
                              toast.success(`${singleClass?.language} class has been Denied!`);
                        }
                  });
      };
      return (
            <div className="w-full min-h-full px-4">
                  <Helmet>
                        <title>Dream View | Manage Classes</title>
                  </Helmet>

                  <div className="rounded my-10 md:my-20">
                        <div className="md:text-2xl uppercase md:pl-[52px] font-semibold flex gap-2">
                              <Fade delay={300} cascade damping={0.02}>Total classes: </Fade>
                              <Bounce>{classes.length}</Bounce>
                        </div>

                        <div className="overflow-x-auto w-full mt-8">
                              <table className="table w-11/12 mx-auto">
                                    {/* head */}
                                    <thead>
                                          <tr className='text-white'>
                                                <th className="text-[20px] bg-[#004A6B] text-center rounded-l">#</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center">Image</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center">Class Name</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center">Instructor</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center">Available Seats</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center">Price</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center">Status</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center rounded-r">Actions</th>

                                          </tr>
                                    </thead>
                                    <tbody>
                                          {sortedClasses.map((singleClass, index) =>
                                                <tr key={singleClass._id}>
                                                      <th>
                                                            {index + 1}
                                                      </th>

                                                      <td className='text-center'>
                                                            <div className="avatar">
                                                                  <div className="mask w-16">
                                                                        <img src={singleClass.image} alt="Avatar" className='rounded-full' />
                                                                  </div>
                                                            </div>
                                                      </td>

                                                      <td className='text-center font-semibold'>{singleClass.language} </td>

                                                      <td className='text-center font-semibold'>
                                                            <div className='flex flex-col'>
                                                                  <div className="font-bold">
                                                                        {singleClass.instructor}
                                                                  </div>
                                                                  <div className="text-sm opacity-50">
                                                                        {singleClass.email}
                                                                  </div>
                                                            </div>
                                                      </td>

                                                      <td className='text-center font-semibold'>{singleClass.available}</td>
                                                      <td className='text-center font-semibold'>$ {singleClass.price}</td>


                                                      <td className="text-center">
                                                            {singleClass.status === 'denied' ? (
                                                                  <span className="text-red-500 font-semibold">Denied</span>
                                                            ) : singleClass.status === 'approved' ? (
                                                                  <span className="text-green-500 font-semibold">Approved</span>
                                                            ) : (
                                                                  <span className="text-blue-500 font-semibold flex gap-1 items-center"><FaSpinner /> Pending</span>
                                                            )}
                                                      </td>


                                                      <td className='text-center mt-4'>
                                                            <div className='flex gap-2 items-center mb-2'>
                                                                  <button onClick={() => handleApprove(singleClass)} disabled={singleClass.status === 'approved' || singleClass.status === 'denied'} className="btn-sm rounded btn hover:bg-[#004A6B] normal-case hover:text-white"> <FcApproval /> Approve
                                                                  </button>

                                                                  <button onClick={() => handleDeny(singleClass)} disabled={singleClass.status === 'denied' || singleClass.status === 'approved'} className="btn-sm rounded btn hover:bg-[#004A6B] normal-case hover:text-white"><MdOutlineDoNotDisturbOff className='text-red-700' /> Deny</button>
                                                            </div>

                                                            <Link to={`/dashboard/feedback/${singleClass._id}`}>
                                                                  <button disabled={singleClass?.feedback}
                                                                        className="btn-sm rounded btn hover:bg-[#004A6B] normal-case hover:text-white"><MdFeedback className='text-blue-500' /> Feedback
                                                                  </button>
                                                            </Link>
                                                      </td>
                                                </tr>)}

                                    </tbody>

                              </table>
                        </div>
                  </div>
            </div>
      );
};

export default ManageClasses;