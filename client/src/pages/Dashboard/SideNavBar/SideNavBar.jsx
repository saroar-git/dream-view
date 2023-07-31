import logo from '../../../assets/images/logo.png';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HiOutlineLogout } from 'react-icons/hi';
import { SiGoogleclassroom } from 'react-icons/si';
import { AiFillFolderOpen, AiOutlineBars, AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { BsFillBagCheckFill, BsFillHouseAddFill, BsFillJournalBookmarkFill, BsFillPersonPlusFill } from 'react-icons/bs';
import { RiUserSettingsFill } from 'react-icons/ri';
import { VscFeedback } from 'react-icons/vsc';
import { MdOutlineManageHistory } from 'react-icons/md';
import useAuth from '../../../hooks/useAuth';
import useAdmin from '../../../hooks/useAdmin';
import useInstructor from '../../../hooks/useInstructor';

const Sidebar = ({ darkMode }) => {
      const navigate = useNavigate();
      const { user, logOut } = useAuth();
      const [isActive, setActive] = useState('false');
      const [isAdmin] = useAdmin();
      const [isInstructor] = useInstructor();

      const handleToggle = () => {
            setActive(!isActive);
      };
      const handleLogOut = () => {
            logOut();
            navigate('/');
      };

      return (
            <>
                  {/* for small device */}
                  <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                        <Link to='/'>
                              <div className='flex gap-2 p-4 font-bold'>
                                    <img src={logo} width='50' alt="logo" data-aos="zoom-in" data-aos-duration="3000" />
                                    <div className="text-[#004A6B] text-center font-bold">
                                          <h2 className="md:text-xl uppercase">Dream View</h2>
                                          <small>Language School</small>
                                    </div>
                              </div>
                        </Link>

                        <button
                              onClick={handleToggle}
                              className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                        >
                              <AiOutlineBars className='h-5 w-5' />
                        </button>
                  </div>

                  {/* navbar for large device */}
                  <div
                        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                              }  md:translate-x-0  transition duration-200 ease-in-out`}
                  >
                        <div>
                              {/* logo */}
                              <div className='border-b-[1px] shadow-sm'>
                                    <div className='w-full flex py-2 justify-center items-center mx-auto'>
                                          <Link to='/'>
                                                <div className='p-4 font-bold'>
                                                      <img src={logo} width='50' alt="logo" data-aos="zoom-in" data-aos-duration="3000"
                                                            className='mx-auto mb-4' />

                                                      <div className="text-[#004A6B] text-center font-bold">
                                                            <h2 className="text-xl uppercase">Dream View</h2>
                                                            <small>Language School</small>
                                                      </div>
                                                </div>
                                          </Link>
                                    </div>
                              </div>

                              {isAdmin ? (
                                    /* admin links */
                                    <div className='flex flex-col justify-between flex-1 mt-6'>
                                          <nav>
                                                <>
                                                      <NavLink
                                                            to='/dashboard/manageUsers'
                                                            className={({ isActive }) =>
                                                                  `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'}`
                                                            }
                                                      >
                                                            <RiUserSettingsFill className='w-5 h-5' />
                                                            <span className='mx-4 font-medium'>Manage Users</span>
                                                      </NavLink>
                                                      <NavLink
                                                            to='/dashboard/manageClasses'
                                                            className={({ isActive }) =>
                                                                  `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'}`
                                                            }
                                                      >
                                                            <SiGoogleclassroom className='w-5 h-5' />
                                                            <span className='mx-4 font-medium'>Manage Classes</span>
                                                      </NavLink>
                                                </>
                                          </nav>
                                    </div>

                              ) : isInstructor?.instructor ? (
                                    /* instructor links */
                                    <div className='flex flex-col justify-between flex-1 mt-6'>
                                          <nav>
                                                <>
                                                      <NavLink
                                                            to='/dashboard/addClass'
                                                            className={({ isActive }) =>
                                                                  `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'}`
                                                            }
                                                      >
                                                            <AiOutlineVideoCameraAdd className='w-5 h-5' />
                                                            <span className='mx-4 font-medium'>Add a Class</span>
                                                      </NavLink>

                                                      <NavLink
                                                            to='/dashboard/myClasses'
                                                            className={({ isActive }) =>
                                                                  `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'}`
                                                            }
                                                      >
                                                            <AiFillFolderOpen className='w-5 h-5' />
                                                            <span className='mx-4 font-medium'>My Classes</span>
                                                      </NavLink>
                                                </>
                                          </nav>
                                    </div>
                              ) : (
                                    /* student links */
                                    <div className='flex flex-col justify-between flex-1 mt-6'>
                                          <nav>
                                                <>
                                                      <NavLink
                                                            to='/dashboard/manageBookings'
                                                            className={({ isActive }) =>
                                                                  `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'}`
                                                            }
                                                      >
                                                            <BsFillJournalBookmarkFill className='w-5 h-5' />
                                                            <span className='mx-4 font-medium'>My Selected Classes</span>
                                                      </NavLink>

                                                      <NavLink
                                                            to='/dashboard/enrolled'
                                                            className={({ isActive }) =>
                                                                  `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'}`
                                                            }
                                                      >
                                                            <BsFillBagCheckFill className='w-5 h-5' />
                                                            <span className='mx-4 font-medium'>My Enrolled Classes</span>
                                                      </NavLink>

                                                      <NavLink
                                                            to='/dashboard/payHistory'
                                                            className={({ isActive }) =>
                                                                  `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'}`
                                                            }
                                                      >
                                                            <MdOutlineManageHistory className='w-5 h-5' />
                                                            <span className='mx-4 font-medium'>Payment History</span>
                                                      </NavLink>
                                                </>
                                          </nav>
                                    </div>
                              )}
                        </div>

                        <div>
                              <hr />
                              <Link
                                    to='/'
                                    className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300 text-gray-600  hover:text-gray-700'
                              >
                                    < BsFillHouseAddFill className='w-5 h-5' />

                                    <span className='mx-4 font-medium'>Home</span>
                              </Link>
                              <button
                                    onClick={handleLogOut}
                                    className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
                              >
                                    <HiOutlineLogout className='w-5 h-5' />

                                    <span className='mx-4 font-medium'>Logout</span>
                              </button>
                        </div>
                  </div>
            </>
      );
};

export default Sidebar;
