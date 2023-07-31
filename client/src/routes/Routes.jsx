import { createBrowserRouter } from 'react-router-dom';
import Main from '../layouts/Main';
import Error from '../pages/Error/Error';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Dashboard from '../layouts/Dashboard';
import ManageUsers from '../pages/Dashboard/AdminDashboard/ManageUsers';
import About from '../pages/About/About';
import Classes from '../pages/Classes/AllClasses';
import Instructors from '../pages/Instructors/AllInstructors';
import AdminRoute from './AdminRoute';
import ManageClasses from '../pages/Dashboard/AdminDashboard/ManageClasses';
import BookCart from '../pages/Dashboard/UserDashboard/BookCart';
import Enrollments from '../pages/Dashboard/UserDashboard/Enrollments';
import Payment from '../pages/Dashboard/UserDashboard/Payment';
import PrivateRoute from './PrivateRoute';
import PaymentHistory from '../pages/Dashboard/UserDashboard/PaymentHistory';
import AddClass from '../pages/Dashboard/InstructorDashboard/AddClass';
import InstructorRoute from './InstructorRoute';
import MyClasses from '../pages/Dashboard/InstructorDashboard/MyClasses';
import Feedback from '../pages/Dashboard/AdminDashboard/Feedback';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'classes', element: <Classes /> },
      { path: 'instructors', element: <Instructors /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    errorElement: <Error />,
    children: [
      // admin routes
      { path: '/dashboard/manageUsers', element: <AdminRoute><ManageUsers /></AdminRoute> },
      { path: '/dashboard/manageClasses', element: <AdminRoute><ManageClasses /></AdminRoute> },
      { path: '/dashboard/feedback/:id', element: <AdminRoute><Feedback /></AdminRoute>, loader: ({ params }) => fetch(`https://dream-view-server-kappa.vercel.app/classes/${params.id}`) },

      // student routes 
      { path: '/dashboard/manageBookings', element: <BookCart /> },
      { path: '/dashboard/enrolled', element: <Enrollments /> },
      { path: '/dashboard/payment', element: <Payment /> },
      { path: '/dashboard/payHistory', element: <PaymentHistory /> },

      // instructor routes
      { path: '/dashboard/addClass', element: <InstructorRoute><AddClass /></InstructorRoute> },
      { path: '/dashboard/myClasses', element: <InstructorRoute><MyClasses /></InstructorRoute> }
    ]
  }
]);
