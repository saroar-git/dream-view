import { Helmet } from 'react-helmet-async';
import useBook from '../../../hooks/useBook';
import { FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { BsFillCreditCardFill } from 'react-icons/bs';
import { Fade, Rotate } from 'react-awesome-reveal';

const BookCart = () => {
      const [books, refetch] = useBook();

      const handleDelete = book => {
            Swal.fire({
                  title: 'Are you sure?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                  if (result.isConfirmed) {
                        fetch(`https://dream-view-server-kappa.vercel.app/book/${book._id}`, {
                              method: 'DELETE'
                        })
                              .then(res => res.json())
                              .then(data => {
                                    if (data.deletedCount > 0) {
                                          refetch();
                                          toast.success('Class has been Removed');
                                    }
                              });
                  }
            });
      };

      return (
            <div className="w-full min-h-full px-4">
                  <Helmet>
                        <title>Dream View | My Bookings</title>
                  </Helmet>

                  <div className="rounded my-10 md:my-20">
                        <div className="md:text-2xl uppercase md:pl-[52px] font-semibold flex gap-2">
                              <Fade delay={300} cascade damping={0.02}>Selected Classes: </Fade>
                              <Rotate>{books?.length}</Rotate>
                        </div>

                        <div className="overflow-x-auto w-full mt-8">
                              <table className="table table-zebra w-11/12 mx-auto">
                                    {/* head */}
                                    <thead>
                                          <tr className="text-white">
                                                <th className="text-[20px] bg-[#004A6B] text-center rounded-l">#</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center">Image</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center">Class Name</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center">Class Instructor</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center">Left Seats</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center">Price</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center">Remove</th>
                                                <th className="text-[17px] bg-[#004A6B] text-center rounded-r">Payment</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {books.map((book, index) => (
                                                <tr key={book._id}>
                                                      <th className="text-center">{index + 1}</th>

                                                      <td className="text-center">
                                                            <div className="avatar">
                                                                  <div className="mask w-16">
                                                                        <img src={book.image} alt="Avatar" className="rounded-md" />
                                                                  </div>
                                                            </div>
                                                      </td>

                                                      <td className="text-center font-semibold">{book.class}</td>
                                                      <td className="text-center font-semibold">{book.instructor}</td>
                                                      <td className="text-center font-semibold">{book.available}</td>

                                                      <td className="text-center font-semibold">$ {book.price}</td>

                                                      <td className="text-center px-0">
                                                            <button
                                                                  onClick={() => handleDelete(book)}
                                                                  className="btn btn-sm btn-outline text-red-600 outline-[#004A6B] hover:bg-[#004A6B]"
                                                            >
                                                                  <FaTrashAlt className='hidden md:block' /> Remove
                                                            </button>
                                                      </td>

                                                      <td className="text-center px-0">
                                                            <Link to="/dashboard/payment">
                                                                  <button className="btn btn-sm btn-outline text-[#004A6B] outline-[#004A6B] hover:bg-[#004A6B]">
                                                                        <BsFillCreditCardFill className='hidden md:block' />   Pay now
                                                                  </button>
                                                            </Link>
                                                      </td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>
                  </div>
            </div>
      );
};

export default BookCart;
