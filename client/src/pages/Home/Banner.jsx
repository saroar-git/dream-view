import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper';
import { Fade, Slide } from "react-awesome-reveal";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

const Banner = () => {
      return (
            <Swiper
                  modules={[Autoplay, EffectFade]}
                  autoplay={{ delay: 4000 }}
                  effect="fade"
            >
                  <SwiperSlide>
                        <div className="relative">
                              <img
                                    src="https://images.unsplash.com/photo-1527891751199-7225231a68dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                                    alt=""
                                    className="w-full md:w-[1170px] md:h-[600px] rounded object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-transparent opacity-80 rounded" />

                              <div className="absolute inset-0 flex flex-col top-6 md:top-28 items-start text-white px-4 md:px-8 lg:px-16 space-y-2 md:space-y-10 w-[60%]">
                                    <Slide>
                                          <h2 className="text-2xl md:text-6xl font-bold">Dream View
                                                <small className='block text-xs md:text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-base-300'>Language School</small>
                                          </h2>
                                    </Slide>

                                    <div className="text-sm md:text-3xl font-semibold">
                                          <span className="inline-block list-disc list-inside md:mb-2">&#8226;</span> Best Campus<br />
                                          <Fade delay={1e3} cascade damping={1e-1}>
                                                <span className="ml-8 text-lg font-normal hidden md:block">We committed to provide a natural environment. <br />
                                                      We committed to provide you highest security. <br />
                                                      Explore Green and Clean allover the campus. <br />
                                                      Vibrant and inspiring campus environment.
                                                </span>
                                          </Fade>


                                          <span className='ml-5 text-xs font-normal md:hidden block'>Natural Environment. <br />No Security Issue. <br />Clean and Green</span>
                                    </div>
                                    <button className="btn-outline btn text-white px-6 py-2 rounded hidden md:block">Explore the campus</button>
                              </div>
                        </div>
                  </SwiperSlide>

                  <SwiperSlide>
                        <div className="relative">
                              <img
                                    src="https://images.unsplash.com/photo-1585637071663-799845ad5212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                                    alt=""
                                    className="w-full rounded md:w-[1170px] md:h-[600px] object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-600 to-transparent opacity-80 rounded" />

                              <div className="absolute inset-0 flex flex-col top-6 md:top-28 items-start text-white px-4 md:px-8 lg:px-16 space-y-2 md:space-y-10 w-[60%]">
                                    <h2 className="text-2xl md:text-6xl font-bold">Dream View
                                          <small className='block text-xs md:text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-base-300'>Language School</small>
                                    </h2>

                                    <div className="text-sm md:text-3xl font-semibold">
                                          <span className="inline-block list-disc list-inside md:mb-2">&#8226;</span> Learning Environment<br />

                                          <span className="ml-8 text-lg font-normal hidden md:block">
                                                We committed to provide noise free classroom. <br />
                                                We take care about peer relations. <br />
                                                We acknowledge Individualism and teacher-student ratio. <br />
                                                We don't compromise illegal attitudes. <br />
                                                Vibrant and inspiring classroom environment.
                                          </span>

                                          <span className='ml-5 text-xs font-normal md:hidden block'>Noise Free Class. <br /> Individualism. <br />Peer Relations. <br />Promote Good Attitude.</span>
                                    </div>
                                    <button className="btn-outline btn text-white px-6 py-2 rounded hidden md:block">Explore the classes</button>
                              </div>
                        </div>
                  </SwiperSlide>

                  <SwiperSlide>
                        <div className="relative">
                              <img
                                    src="https://images.unsplash.com/photo-1560931296-168316935386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80"
                                    alt=""
                                    className="w-full rounded md:w-[1170px] md:h-[600px] object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-700 to-transparent opacity-80 rounded" />

                              <div className="absolute inset-0 flex flex-col top-6 md:top-28 items-start text-white px-4 md:px-8 lg:px-16 space-y-2 md:space-y-10 w-[60%]">
                                    <h2 className="text-2xl md:text-6xl font-bold">Dream View
                                          <small className='block text-xs md:text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-base-300'>Language School</small>
                                    </h2>

                                    <div className="text-sm md:text-3xl font-semibold">
                                          <span className="inline-block list-disc list-inside md:mb-2">&#8226;</span> Extra-Curricular<br />

                                          <span className="ml-8 text-lg font-normal hidden md:block">
                                                We encourage extra-curricular activities. <br />
                                                We have multi-functional indoor-outdoor fields. <br />
                                                We promote entertainment. <br />
                                                A beautiful mind in a beautiful body.
                                          </span>

                                          <span className='ml-5 text-xs font-normal md:hidden block'>Fields and Pools. <br /> Indoor-Outdoor Games. <br />Entertainments. <br />Promote Good Health.</span>
                                    </div>
                                    <button className="btn-outline btn text-white px-6 py-2 rounded hidden md:block">Explore the joys</button>
                              </div>
                        </div>
                  </SwiperSlide>

                  <SwiperSlide>
                        <div className="relative">
                              <img
                                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" className='md:w-[1170px] md:h-[600px] w-full rounded object-cover'
                              />

                              <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-80 rounded" />

                              <div className="absolute inset-0 flex flex-col top-6 md:top-28 items-start text-white px-4 md:px-8 lg:px-16 space-y-2 md:space-y-10 w-[60%]">
                                    <h2 className="text-2xl md:text-6xl font-bold">Dream View
                                          <small className='block text-xs md:text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-base-300'>Language School</small>
                                    </h2>

                                    <div className="text-sm md:text-3xl font-semibold">
                                          <span className="inline-block list-disc list-inside md:mb-2">&#8226;</span> Multiculturalism<br />

                                          <span className="ml-8 text-lg font-normal hidden md:block">
                                                We believe in multiculturalism. <br />
                                                We have students all over the world. <br />
                                                We respect individual identity. <br />
                                                We aware about your faith, identity and abilities.
                                          </span>

                                          <span className='ml-5 text-xs font-normal md:hidden block'>Multiculturalism. <br /> Individual Identity. <br />Live Together. <br />Promote Everybody.</span>
                                    </div>
                                    <button className="btn-outline btn text-white px-6 py-2 rounded hidden md:block">Explore the cultures</button>
                              </div>
                        </div>
                  </SwiperSlide>
            </Swiper>
      );
};

export default Banner;
