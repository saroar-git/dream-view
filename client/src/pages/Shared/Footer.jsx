import logo from '../../assets/images/logo.png';
import img1 from '../../assets/logos/qaf.png';
import img2 from '../../assets/logos/chai.png';
import img3 from '../../assets/logos/jpns.png';

const Footer = ( { darkMode }) => {
      return (
            <footer className={darkMode ? "dark-mode border-t-[1px] border-gray-700 shadow-sm px-10 pt-10 pb-4" : "border-t-[1px] shadow-sm px-10 pt-10 pb-4 bg-base-200 hover:bg-base-300 text-[#004A6B]"}>
                  <div className='footer mb-10'>
                        <div className='font-bold'>
                              <img src={logo} alt="logo" width={80} data-aos="zoom-in" data-aos-duration="3000" />
                              <p>DREAM VIEW<br />Language Learning School since 2000</p>
                        </div>

                        <div>
                              <span className="footer-title">Contact</span>
                              <h3 className="link link-hover">
                                    <span className='font-semibold'>Email:</span> learn@dream.edu.us
                              </h3>
                              <h3 className="link link-hover">
                                    <span className='font-semibold'>Mobile:</span> +123 45678912
                              </h3>
                              <h3 className="link link-hover">
                                    <span className='font-semibold'>Address:</span> Rajshahi, Bangladesh
                              </h3>
                        </div>

                        <div>
                              <span className="footer-title">Coming Courses On</span>
                              <h3 className="link link-hover font-semibold flex items-center gap-2"> <img src={img1} width={15} alt="language" /> Arabic with Quran Course</h3>
                              <h3 className="link link-hover font-semibold flex items-center gap-2"> <img src={img2} width={15} alt="language" /> Hebrew with Torah Course</h3>
                              <h3 className="link link-hover font-semibold flex items-center gap-2"> <img src={img3} width={15} alt="language" /> Japanese - Korean Package</h3>
                        </div>

                        <div>
                              <span className="footer-title">Get Updates</span>
                              <div className="form-control w-80">
                                    <label className="label">
                                          <span >We keep you up-to-date about our offers!</span>
                                    </label>
                                    <div className="relative">
                                          <input type="text" placeholder="username@site.com" className="input input-bordered w-full md:pr-16" />
                                          <button className="btn bg-[#004A6B] absolute top-0 right-0 rounded-l-none text-white hover:text-black">Subscribe</button>
                                    </div>
                              </div>
                        </div>
                  </div>

                  <div className='text-center  font-semibold'>
                        <p>Copyright © 2023 - All right reserved by Dream View LST.</p>
                  </div>
            </footer>
      );
};

export default Footer;