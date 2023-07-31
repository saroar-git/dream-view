import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaChalkboardTeacher, FaDollarSign } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const AllClasses = () => {
      const [courses, setCourses] = useState([]);
      const { user } = useAuth();
      const navigate = useNavigate();
      const location = useLocation();

      const { data: role = null } = useQuery(['userRole', user?.email], async () => {
            const res = await fetch(`https://dream-view-server-kappa.vercel.app/users/role/${user?.email}`);
            return res.json();
      });

      useEffect(() => {
            fetch("https://dream-view-server-kappa.vercel.app/classes")
                  .then((res) => res.json())
                  .then((data) => setCourses(data));
      }, []);
      const approvedCourses = courses.filter((course) => course.status === "approved");

      const handleAddAsBook = (course) => {
            if (user && user.email) {
                  const classInfo = {
                        itemId: course._id,
                        class: course.language,
                        instructor: course.instructor,
                        available: course.available,
                        price: course.price,
                        image: course.image,
                        email: user?.email,
                  };

                  fetch("https://dream-view-server-kappa.vercel.app/book", {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify(classInfo),
                  })
                        .then((res) => res.json())
                        .then((data) => {
                              if (data.insertedId) {
                                    toast.success('Class Added to Your Dashboard');
                                    navigate('/dashboard/manageBookings');
                              }
                        });
            } else {
                  toast.error('Please login to add this class');
                  navigate("/login", { state: { from: location } });
            }
      };

      return (
            <div className="text-center mb-10">
                  <Helmet>
                        <title>Dream View | Classes</title>
                  </Helmet>

                  <div className="space-y-3 md:space-y-4 mb-8 pt-32">
                        <h2 className="text-xl text-[#004A6B] md:text-4xl font-bold">Our all Classes</h2>
                        <hr className="md:w-3/12 mx-auto border border-[#004A6B]" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {approvedCourses.map((course) => (
                              <div
                                    key={course._id}
                                    className={`card card-compact w-full shadow-xl ${course.available === 0 ? "bg-red-700 text-white" : ""
                                          }`}
                              >
                                    <figure className="relative p-4">
                                          <LazyLoadImage
                                                src={course.image}
                                                alt="Course"
                                                className="rounded w-96 h-52 object-cover"
                                                effect="blur"
                                                loading="lazy"
                                          />

                                          <p className="absolute top-5 right-9 font-semibold bg-[#004A6B] text-white rounded px-2 py-1 flex items-center gap-1 text-sm">
                                                <FaDollarSign /> {course.price}
                                          </p>
                                    </figure>
                                    <div className="card-body">
                                          <h2 className="card-title">Class: {course.language}</h2>

                                          <p className="text-start text-lg flex items-center gap-2 link link-hover hover:text-[#004A6B] mt-2">
                                                <FaChalkboardTeacher /> {course.instructor}
                                          </p>

                                          <p className="text-start text-lg flex items-center gap-2">
                                                <MdEventAvailable /> {course.available}
                                                <span className={`${course.available === 0 ? 'text-white text-xs' : 'text-[#004A6B] text-xs'}`}>
                                                      (seats available)
                                                </span>
                                          </p>

                                          <div className="card-actions justify-end">
                                                <button
                                                      onClick={() => handleAddAsBook(course)}
                                                      className="btn btn-outline outline-[#004A6B] hover:bg-[#004A6B] hover:text-white"
                                                      disabled={
                                                            course.available === 0 ||
                                                            (user && (role?.role === "admin" || role?.role === "instructor"))
                                                      }
                                                >
                                                      Book now
                                                      <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-6 w-6"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                            />
                                                      </svg>
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default AllClasses;
