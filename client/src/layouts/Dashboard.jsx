import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNavBar from '../pages/Dashboard/SideNavBar/SideNavBar';
import useAuth from '../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import { Slide } from 'react-awesome-reveal';

const Dashboard = () => {
      const { user } = useAuth();

      return (
            <div className='relative min-h-screen md:flex'>
                  <Helmet><title>Dream View | Dashboard</title></Helmet>

                  <SideNavBar />
                  <div className='flex-1 md:ml-72'>
                        <div className='p-5'>
                              <Slide delay={300} cascade damping={0.5}>
                                    <h1 className='text-xl md:text-4xl font-semibold my-5 text-[#004A6B]'>Hey {user?.displayName}, Welcome!</h1>
                              </Slide>
                              <Outlet />
                        </div>
                  </div>
            </div>
      );
};

export default Dashboard;