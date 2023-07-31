import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { LuMailPlus } from "react-icons/lu";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const AllInstructors = () => {
      const [instructors, setInstructors] = useState([]);

      useEffect(() => {
            fetch("https://dream-view-server-kappa.vercel.app/instructors")
                  .then((res) => res.json())
                  .then((data) => setInstructors(data));
      }, []);

      const handleEmailClick = (email) => {
            window.location.href = `mailto:${email}`;
      };

      return (
            <div className='text-center mb-10'>
                  <Helmet><title>Dream View | Instructors</title></Helmet>

                  <div className='space-y-3 md:space-y-4 mb-8 pt-32'>
                        <h2 className='text-xl text-[#004A6B] md:text-4xl font-bold'>Meet Our all Talented Instructors</h2>
                        <hr className="md:w-7/12 mx-auto border border-[#004A6B]" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {instructors && instructors.map(instructor => (
                              <div key={instructor._id} className="card card-side justify-start items-center pl-3 shadow-xl">
                                    <figure className="py-3">
                                          <LazyLoadImage src={instructor.image} alt="instructor" className="rounded-lg h-48 object-top" effect="blur" loading='lazy' />
                                    </figure>
                                    <div className="card-body">

                                          <h2 className="card-title">{instructor.name}</h2>

                                          <p className="text-start flex items-center gap-2 text-xs md:text-sm link link-hover hover:text-[#004A6B]" onClick={() => handleEmailClick(instructor.email)}>
                                                <LuMailPlus /> {instructor.email}
                                          </p>
                                          <p className="text-start mt-1 text-[#004A6B] font-semibold">Total Classes: {instructor.classes}</p>
                                    </div>
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default AllInstructors;