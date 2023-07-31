import { Helmet } from "react-helmet-async";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useBook from "../../../hooks/useBook";
import CheckOutForm from "./PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK);

const Payment = () => {
      const [books, refetch] = useBook();
      const total = books.reduce((sum, item) => sum + item.price, 0);
      const price = parseFloat(total.toFixed(2));

      return (
            <div className="w-full min-h-full">
                  <Helmet>
                        <title>Dream View | Payment</title>
                  </Helmet>

                  <div className="w-3/5 mx-auto mt-40">
                        <Elements stripe={stripePromise}>
                              <CheckOutForm price={price} books={books} />
                        </Elements>
                  </div>
            </div>
      );
};


export default Payment;