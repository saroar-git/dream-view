import { Link } from 'react-router-dom';
import img from '../../assets/images/404.gif'
import { Helmet } from "react-helmet-async";

const Error = () => {
      return (
            <div className='text-center bg-[#F0F0F0]'>
                  <Helmet><title>Page Not Found</title></Helmet>
                  
                  <img className='mx-auto pt-12' src={img} alt="" />
                  <button className='btn btn-outline border-[#004A6B] text-[#004A6B] hover:bg-[#004A6B] hover:text-white hover:border-none mb-6'> <Link to='/'>Back to Home</Link></button>
            </div>
      );
};

export default Error;