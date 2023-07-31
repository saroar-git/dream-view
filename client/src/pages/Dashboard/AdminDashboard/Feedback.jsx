import { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Container from '../../../components/Container';

const Feedback = () => {
      const singleClass = useLoaderData();
      const navigate = useNavigate();
      const [feedback, setFeedback] = useState('');

      const handleSubmit = async (event) => {
            event.preventDefault();
            const response = await fetch(`https://dream-view-server-kappa.vercel.app/classes/feedback/${singleClass._id}`, {
                  method: 'PATCH',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ feedback }),
            });

            if (response) {
                  toast('Feedback submitter');
                  event.target.reset();
                  navigate('/dashboard/manageClasses');
            }
      };

      return (
            <div className="w-full min-h-full px-4">
                  <Helmet>
                        <title>Dream View | Feedback</title>
                  </Helmet>

                  <div className="rounded mt-16 mb-5 md:mt-40">
                        <div className="md:text-2xl uppercase md:pl-20 font-semibold">
                              <Fade delay={300} cascade damping={0.02}>Write a Feedback </Fade>
                        </div>
                  </div>

                  <Container>
                        <div className="overflow-x-auto w-full mx-auto">
                              <form onSubmit={handleSubmit}>
                                    <textarea className="textarea h-40 border-[#004A6B] textarea-lg w-10/12 block" value={feedback}
                                          onChange={(e) => setFeedback(e.target.value)}
                                          placeholder="Type your feedback"></textarea>
                                    <div className='text-right w-10/12 mt-4'>
                                          <button className='btn btn-outline outline-[#004A6B] text-[#004A6B] hover:bg-[#004A6B] hover:text-white uppercase font-bold'>
                                                <input type="submit" value="Submit" />
                                          </button>
                                    </div>
                              </form>
                        </div>
                  </Container>
            </div>
      );
};

export default Feedback;
