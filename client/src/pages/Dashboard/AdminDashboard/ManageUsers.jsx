import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { GiTeacher } from "react-icons/gi";
import { RiAdminFill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Swal from 'sweetalert2';
import { Fade, Rotate } from 'react-awesome-reveal';

const ManageUsers = () => {
      const { data: users = [], refetch } = useQuery(['users'], async () => {
            const res = await fetch('https://dream-view-server-kappa.vercel.app/users');
            return res.json();
      });

      const sortedUsers = [...users].sort((a, b) => {
            if (a.role < b.role) {
                  return -1;
            }
            if (a.role > b.role) {
                  return 1;
            }
            return 0;
      });

      const handleMakeAdmin = user => {
            fetch(`https://dream-view-server-kappa.vercel.app/users/admin/${user._id}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ role: "admin" })
            })
                  .then(res => res.json())
                  .then(data => {
                        if (data.modifiedCount) {
                              refetch();
                              toast.success(`${user?.name} is an Admin Now!`);
                        }
                  });
      };

      const handleMakeInstructor = user => {
            fetch(`https://dream-view-server-kappa.vercel.app/users/instructor/${user._id}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ role: "instructor" })
            })
                  .then(res => res.json())
                  .then(data => {
                        if (data.modifiedCount) {
                              // Post the user to the instructors endpoint
                              fetch('https://dream-view-server-kappa.vercel.app/instructors', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(user)
                              })
                                    .then(res => res.json())
                                    .then(() => {
                                          refetch();
                                          toast.success(`${user?.name} is an Instructor Now!`);
                                    });
                        }
                  });
      };

      const handleDelete = user => {
            Swal.fire({
                  title: 'Are you sure?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                  if (result.isConfirmed) {
                        fetch(`https://dream-view-server-kappa.vercel.app/users/admin/${user._id}`, {
                              method: 'DELETE'
                        })
                              .then(res => res.json())
                              .then(data => {
                                    if (data.deletedCount > 0) {
                                          // Remove the user from the instructors endpoint
                                          fetch(`https://dream-view-server-kappa.vercel.app/instructors/${user._id}`, {
                                                method: 'DELETE'
                                          })
                                                .then(res => res.json())
                                                .then(() => {
                                                      refetch();
                                                      toast.error(`${user.name} has been Removed`);
                                                });
                                    }
                              });
                  }
            });
      };

      return (
            <div className="w-full min-h-full px-4">
                  <Helmet>
                        <title>Dream View | Manage Users</title>
                  </Helmet>

                  <div className="rounded my-10 md:my-20">

                        <div className="md:text-2xl uppercase md:pl-[52px] font-semibold flex gap-2">
                              <Fade delay={300} cascade damping={0.02}>Total users: </Fade>
                              <Rotate>{users.length}</Rotate>
                        </div>

                        <div className="overflow-x-auto w-full mt-8">
                              <table className="table w-11/12 mx-auto">
                                    {/* head */}
                                    <thead>
                                          <tr className='text-white'>
                                                <th className="text-[20px] bg-[#004A6B] text-center rounded-l">#</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center">Profile</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center">Name</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center">Email</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center">User Role</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center">Actions Role</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center rounded-r">Remove</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {sortedUsers.map((user, index) =>
                                                <tr key={user._id}>
                                                      <th>
                                                            {index + 1}
                                                      </th>
                                                      <td className='text-center'>
                                                            <div className="avatar">
                                                                  <div className="mask w-16">
                                                                        <img src={user.image} alt="Avatar" className='rounded-full' />
                                                                  </div>
                                                            </div>
                                                      </td>
                                                      <td className='text-center font-semibold'>{user.name} </td>
                                                      <td className='text-center font-semibold'>{user.email}</td>
                                                      <td className="text-center font-semibold">
                                                            {user.role === 'instructor' ? (
                                                                  <span className="text-purple-600 font-semibold">Instructor</span>
                                                            ) : user.role === 'admin' ? (
                                                                  <span className="text-green-500 font-semibold">Admin</span>
                                                            ) : (
                                                                  <span className="text-blue-500 font-semibold">Student</span>
                                                            )}
                                                      </td>
                                                      <td className="text-center flex gap-2 mt-3">
                                                            <button
                                                                  onClick={() => handleMakeAdmin(user)} disabled={user.role === 'admin'}
                                                                  className="btn btn-outline text-[#004A6B] hover:bg-[#004A6B] normal-case"
                                                            >
                                                                  <RiAdminFill className='text-green-600 hidden md:block' /> Admin
                                                            </button>

                                                            <button
                                                                  onClick={() => handleMakeInstructor(user)} disabled={user.role === 'instructor'}
                                                                  className="btn btn-outline text-[#004A6B] hover:bg-[#004A6B] normal-case"
                                                            >
                                                                  <GiTeacher className='text-purple-600 hidden md:block' /> Instructor
                                                            </button>
                                                      </td>
                                                      <td className='text-center'>
                                                            <button onClick={() => handleDelete(user)} className="btn btn-outline text-[#004A6B] hover:bg-[#004A6B] normal-case"
                                                            >
                                                                  <FaTrashAlt className='text-red-600 hidden md:block' /> Remove
                                                            </button>
                                                      </td>
                                                </tr>)}
                                    </tbody>
                              </table>
                        </div>
                  </div>
            </div>
      );
};

export default ManageUsers;
