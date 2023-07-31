import { Bounce } from "react-awesome-reveal";
import { GiCampingTent, GiFallingLeaf, GiPriceTag } from "react-icons/gi";
import { MdOutlineTravelExplore } from "react-icons/md";

const Introductions = () => {
      return (
            <div className="mt-20 text-center">
                  <div className="space-y-3 md:space-y-4 mb-8">
                        <Bounce>
                              <h2 className="text-xl md:text-4xl font-bold">Travelers Why Choose Us?</h2>
                        </Bounce>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="card w-full shadow-md border-[1px]">
                              <div className="card-body my-4">
                                    <div className="flex items-center gap-3">
                                          <GiPriceTag className="text-7xl text-[#004A6B] bg-base-300 rounded-full p-4" />
                                          <h2 className="card-title">Facilities/Prices</h2>
                                    </div>
                                    <p className="text-left md:ml-[61px] text-gray-500">Discover our state-of-the-art facilities and competitive prices for an enriching language learning experience.</p>
                              </div>
                        </div>
                        <div className="card w-full shadow-md border-[1px]">
                              <div className="card-body my-4">
                                    <div className="flex items-center gap-3">
                                          <GiFallingLeaf className="text-7xl text-[#004A6B] bg-base-300 rounded-full p-4" />
                                          <h2 className="card-title">Environment</h2>
                                    </div>
                                    <p className="text-left text-gray-500 md:ml-[61px]"> Immerse yourself in a supportive and nurturing environment that fosters language acquisition and personal growth.</p>
                              </div>
                        </div>
                        <div className="card w-full shadow-md border-[1px]">
                              <div className="card-body my-4">
                                    <div className="flex items-center gap-3">
                                          <GiCampingTent className="text-7xl text-[#004A6B] bg-base-300 rounded-full p-4" />
                                          <h2 className="card-title">Outdoor Camping</h2>
                                    </div>
                                    <p className="text-left text-gray-500 md:ml-[61px]">Embark on an unforgettable adventure with our outdoor camping activities, combining language learning and exploration of the great outdoors.</p>
                              </div>
                        </div>
                        <div className="card w-full shadow-md border-[1px]">
                              <div className="card-body my-4">
                                    <div className="flex items-center gap-3">
                                          <MdOutlineTravelExplore className="text-7xl text-[#004A6B] bg-base-300 rounded-full p-4" />
                                          <h2 className="card-title">Learning with Zero Pressure</h2>
                                    </div>
                                    <p className="text-left text-gray-500 md:ml-[61px]">Experience a stress-free learning environment where you can enhance your language skills at your own pace, without any pressure or judgment.</p>
                              </div>
                        </div>
                  </div>
                  
            </div>
      );
};

export default Introductions;