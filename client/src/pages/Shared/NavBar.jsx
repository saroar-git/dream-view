import Container from "../../components/Container";
import logo from '../../assets/images/logo.png';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const NavBar = ({ toggleMode, darkMode }) => {
      const { user, logOut } = useAuth();
      const [isOpen, setIsOpen] = useState(false);

      return (
            <div className={darkMode ? "dark-mode fixed w-full z-10 shadow-sm" : "white-mode fixed w-full z-10 shadow-sm"}>
                  <div className={darkMode ? "dark-mode py-4 border-b-[1px] border-gray-700" : "white-mode py-4 border-b-[1px]"}>
                        <Container>
                              <div className="flex items-center justify-between gap-3 md:gap-0">
                                    <Link to='/'>
                                          <div className="flex items-center gap-4">
                                                <img src={logo} width='50' alt="logo" data-aos="zoom-in" data-aos-duration="3000" />
                                                <div className="text-[#004A6B] text-center font-bold">
                                                      <h2 className="md:text-xl uppercase">Dream View</h2>
                                                      <small>Language School</small>
                                                </div>
                                          </div>
                                    </Link>

                                    <div className="hidden md:block">
                                          <div className='flex nav flex-row items-center justify-between'>

                                                <NavLink to='/' className='font-semibold px-6'>Home</NavLink>

                                                <NavLink to='/instructors' className='font-semibold px-6 '>Instructors</NavLink>

                                                <NavLink to='/classes' className='font-semibold px-6 border-x-[1px]'>Classes</NavLink>

                                                <NavLink to='/about' className='font-semibold px-6 border-x-[1px]'>About Us </NavLink>

                                                {user && <NavLink to='/dashboard' className='font-semibold px-6'>Dashboard </NavLink>}
                                          </div>
                                    </div>

                                    <div className='relative'>

                                          <div className='flex flex-row items-center gap-3'>
                                                <>
                                                      <button onClick={toggleMode}>
                                                            {darkMode ? <BsFillSunFill /> : <BsFillMoonStarsFill/>}
                                                      </button>
                                                </>
                                                <div
                                                      onClick={() => setIsOpen(!isOpen)}
                                                      className='p-4 md:py-1 md:px-2 border-neutral-200 flex flex-row items-center gap-3 cursor-pointer transition text-3xl md:text-2xl'
                                                >
                                                      {isOpen ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}

                                                      {user && user.photoURL && <div className='hidden md:block aspect-w-4 aspect-h-3'>
                                                            <img src={user?.photoURL} width='40' alt="profile" className='rounded-full shadow-md object-cover object-center' title={user?.displayName} />
                                                      </div>}
                                                </div>
                                          </div>
                                          {/* dropdown  */}
                                          {isOpen && (
                                                <div className={darkMode ? "dark-mode absolute rounded-xl shadow-md w-[38vw] md:w-[8vw] overflow-hidden right-0 top-12" : "white-mode absolute rounded-xl shadow-md w-[38vw] md:w-[8vw] overflow-hidden right-0 top-12"}>
                                                      <div className='flex flex-col'>

                                                            <Link to='/' className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'> Home </Link>

                                                            <Link to='/classes' className='block md:hidden px-4 pb-3 hover:bg-neutral-100 transition font-semibold'>Classes</Link>

                                                            <Link to='/instructors' className='block md:hidden px-4 pb-3 hover:bg-neutral-100 transition font-semibold'>Instructors</Link>

                                                            {user && <Link to='/dashboard' className='block md:hidden px-4 pb-3 hover:bg-neutral-100 transition font-semibold'>Dashboard</Link>}

                                                            {user ? (
                                                                  <div
                                                                        onClick={logOut}
                                                                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                                                                  >
                                                                        Logout
                                                                  </div>
                                                            ) : (
                                                                  <>
                                                                        <Link
                                                                              to='/login'
                                                                              className='px-4 py-4 hover:bg-neutral-100 transition font-semibold'
                                                                        >
                                                                              Login
                                                                        </Link>

                                                                        <Link
                                                                              to='/register'
                                                                              className='px-4 pb-4 hover:bg-neutral-100 hidden md:block transition font-semibold'
                                                                        >
                                                                              Register
                                                                        </Link>
                                                                  </>
                                                            )}
                                                      </div>
                                                </div>
                                          )}
                                    </div>
                              </div>
                        </Container>
                  </div>
            </div>
      );
};

export default NavBar;