/* eslint-disable no-undef */
import React, { useContext, useState } from "react";
import { useHistory } from 'react-router-dom';
import { DataContext } from '../../context/dataState';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const stripe = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

const StripeCheckout = ({ total }) => {
  return (
    <Elements stripe={stripe}>
      <CheckoutForm total={total} />
    </Elements>
  );
};

function CheckoutForm({ total }) {
  const { showMessage } = useContext(DataContext);
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  let history = useHistory();

  const payMoney = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setPaymentLoading(true);
    const { data } = await axios.post('https://happy-feynman-ee5652.netlify.app/.netlify/functions/index', {
      amount: Number(total) * 100,
    });

    const { clientSecret } = data;

    console.log('Client secret: ', clientSecret);

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "John Doe",
        },
      },
    });
    setPaymentLoading(false);
    if (paymentResult.error) {
      console.error(paymentResult.error.message);
      const message = {
        status: 'error',
        title: 'An error occured while processing your payment. Please try again.',
        description: paymentResult.error.message
      };
      showMessage(message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        const message = {
          status: 'success',
          title: 'Payment successful!',
          description: 'Thank you for your donation!'
        };
        showMessage(message);
        console.log('Payment succeeded');
        history.goBack();
      }
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        backgroundColor: 'white'
      }
    },
    hidePostalCode: true,
  }

  return (
    <div
      style={{
        padding: "24px",
        width: "100%",

      }}
    >
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <form
          style={{
            display: "block",
            width: "100%",
          }}
          onSubmit = {payMoney}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardElement
              className="card"
              options={cardElementOptions}
            />
            <button
              className="pay-button"
              disabled={isPaymentLoading}
            >
              {isPaymentLoading ? "Processing..." : "Pay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StripeCheckout;