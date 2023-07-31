import { useEffect, useState } from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Classes = () => {
      const [classes, setClasses] = useState([]);

      useEffect(() => {
            fetch("https://dream-view-server-kappa.vercel.app/classes")
                  .then((res) => res.json())
                  .then((data) => setClasses(data));
      }, []);

      // Filter the classes according to least available seats
      const filteredClasses = classes.filter(course => course.status === 'approved')
            .sort((a, b) => a.available - b.available)
            .slice(0, 6);

      return (
            <div className="my-20 text-center">
                  <div className="space-y-3 md:space-y-4 mb-8">
                        <Zoom><h2 className="text-xl md:text-4xl font-bold">Explore Our Popular Classes</h2></Zoom>
                        <Fade delay={300} cascade damping={0.02} className="text-xs md:text-base w-9/12 mx-auto text-gray-500">
                              We're committed to providing you our best services this summer!
                        </Fade>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredClasses.map((course) => (
                              <div key={course._id} className="card card-compact w-full shadow-xl">
                                    <figure className="p-4">
                                          <LazyLoadImage
                                                src={course.image}
                                                alt="Course"
                                                className="rounded w-96 h-52 object-cover"
                                                effect="blur"
                                                loading="lazy"
                                          />
                                    </figure>
                                    <div className="card-body">
                                          <h2 className="card-title">Class: {course.language}</h2>
                                          <p className="text-start text-base mb-4">Instructor: {course.instructor}</p>
                                    </div>
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default Classes;
