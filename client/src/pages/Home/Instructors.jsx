import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import Container from "../../components/Container";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Fade, JackInTheBox } from "react-awesome-reveal";

const Instructors = () => {
      const [instructors, setInstructors] = useState([]);

      useEffect(() => {
            fetch("https://dream-view-server-kappa.vercel.app/instructors")
                  .then((res) => res.json())
                  .then((data) => setInstructors(data.slice(0, 6)));
      }, []);

      // Filter the instructor according to class numbers
      const filteredInstructors = instructors.sort((a, b) => b.classes - a.classes);

      return (
            <div className="my-20 text-center">
                  <div className="space-y-3 md:space-y-4 mb-8">
                        <JackInTheBox><h2 className="text-xl md:text-4xl font-bold">Meet Our Popular Instructors</h2></JackInTheBox>
                        <Fade delay={300} cascade damping={0.02} className="text-xs md:text-base w-9/12 mx-auto text-gray-500">
                              We've the most talented and friendly instructors, we promote youth! Let's have a look of our gorgeous instructors.
                        </Fade>
                  </div>
                  <Container>
                        <Swiper
                              effect={"cards"}
                              slidesPerView={"auto"}
                              spaceBetween={30}
                              freeMode={true}
                              modules={[EffectCards]}
                              className="mySwiper"
                        >
                              {filteredInstructors.map((instructor) => (
                                    <SwiperSlide key={instructor._id}>
                                          <div className="p-4">
                                                <figure className="w-11/12 mx-auto md:p-8 flex justify-center">
                                                      <LazyLoadImage src={instructor.image} alt="instructor" className="rounded md:h-80" effect="blur"
                                                            loading='lazy' />
                                                </figure>
                                                <div className="bg-gray-500 p-12 text-center rounded space-y-3">
                                                      <h2 className="text-xl md:text-3xl font-bold">{instructor.name}</h2>
                                                      <p className="text-sm text-gray-200 font-semibold">Number of Classes: {instructor.classes}</p>
                                                </div>
                                          </div>
                                    </SwiperSlide>
                              ))}
                        </Swiper>
                  </Container>
            </div>
      );
};

export default Instructors;
