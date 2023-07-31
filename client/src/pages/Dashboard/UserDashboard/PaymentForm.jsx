import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import { BsFillCreditCard2BackFill } from 'react-icons/bs';
import { Bounce } from 'react-awesome-reveal';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ books, price }) => {
      const stripe = useStripe();
      const elements = useElements();
      const navigate = useNavigate();
      const { user } = useAuth();
      const [axiosSecure] = useAxiosSecure();
      const [clientSecret, setClientSecret] = useState('');
      const [processing, setProcessing] = useState(false);
      const [transactionId, setTransactionId] = useState('');

      useEffect(() => {
            if (price > 0) {
                  axiosSecure.post('/create-payment-intent', { price })
                        .then(res => {
                              setClientSecret(res.data.clientSecret);
                        });
            }
      }, [price, axiosSecure]);

      const handleSubmit = async (event) => {
            event.preventDefault();

            if (!stripe || !elements) {
                  return;
            }

            const card = elements.getElement(CardElement);
            if (card === null) {
                  return;
            }

            const { error } = await stripe.createPaymentMethod({
                  type: 'card',
                  card
            });

            if (error) {
                  toast.error(error.message);
            }

            setProcessing(true);

            const { paymentIntent } = await stripe.confirmCardPayment(
                  clientSecret,
                  {
                        payment_method: {
                              card: card,
                              billing_details: {
                                    name: user?.displayName || 'anonymous',
                                    email: user?.email || 'unknown'
                              },
                        },
                  },
            );

            setProcessing(false);
            if (paymentIntent?.status === 'succeeded') {
                  setTransactionId(paymentIntent.id);

                  const payment = {
                        email: user?.email,
                        transactionId: paymentIntent.id,
                        price,
                        date: new Date(),
                        bookItem: books.map(book => book._id),
                        classImage: books.map(book => book.image),
                        classItem: books.map(book => book.itemId),
                        className: books.map(book => book.class),
                        instructor: books.map(book => book.instructor)
                  };

                  axiosSecure.post('/payments', { payment, books })
                        .then(res => {
                              if (res.data.insertResult.insertedId) {
                                    toast.success('Payment successful');
                                    navigate('/dashboard/enrolled');

                                    // reduce 1 available seat from the class
                                    books.forEach((book) => {
                                          const itemId = book.itemId;
                                          fetch(`https://dream-view-server-kappa.vercel.app/classes/available/${itemId}`, {
                                                method: 'PATCH',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ available: -1 }),
                                          })
                                                .then((res) => res.json())
                                                .then(() => { });
                                    });

                                    // add 1 enroll data in classes
                                    books.forEach((book) => {
                                          const itemId = book.itemId;
                                          fetch(`https://dream-view-server-kappa.vercel.app/classes/enroll/${itemId}`, {
                                                method: 'PATCH',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ enroll: 1 }),
                                          })
                                                .then((res) => res.json())
                                                .then(() => { });
                                    });

                              }
                        })
                        .catch(error => {
                              toast.error(error);
                        });
            }
      };


      return (
            <>
                  <form className="w-3/5 mx-auto text-center" onSubmit={handleSubmit}>
                        <h2 className='mb-8 text-xl font-bold text-[#004A6B] flex items-center gap-2 justify-center'><BsFillCreditCard2BackFill /> <Bounce>Card Payments Only</Bounce> ($ {price})</h2>
                        <CardElement
                              className="border-2 border-[#004A6B] p-3 rounded-lg"
                              options={{
                                    style: {
                                          base: {
                                                fontSize: '16px',
                                                color: '#424770',
                                                '::placeholder': {
                                                      color: '#aab7c4',
                                                },
                                          },
                                          invalid: {
                                                color: '#9e2146',
                                          },
                                    },
                              }}
                        />
                        <button className="btn btn-outline outline-[#004A6B] btn-wide px-3 py-2 text-[#004A6B] font-bold uppercase rounded-lg mt-8 hover:bg-[#004A6B]" type="submit" disabled={!stripe || !clientSecret || processing}>
                              {processing ? 'Processing...' : 'Pay'}
                        </button>
                  </form>

                  <p className="text-[#004A6B] text-center text-xl mt-4">{transactionId && <>Transaction completed with transactionId: {transactionId}</>}</p>
            </>
      );
};


export default PaymentForm;