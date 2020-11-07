/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { DataContext } from '../../context/dataState';

export default function PayPal({ total }) {
  const paypalRef = useRef();
  const { showMessage } = useContext(DataContext);

  useEffect(() => {
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          intent: 'CAPTURE',
          purchase_units: [
            {
              description: 'One-time donation',
              amount: {
                currency_code: 'USD',
                value: total,
              }
            },
          ],
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        console.log('SUCCESS: ', order);
        const message = {
          status: 'success',
          title: 'Payment successful!',
          description: 'Thank you for your donation!'
        };
        showMessage(message);
        return <Redirect to="/" />
      },
      onError: (err) => {
        // console.error('ERROR: ', err);
        const message = {
          status: 'error',
          title: 'An error occured while processing your payment. Please try again.',
          description: err.message
        };
        showMessage(message);
      },
    })
    .render(paypalRef.current);
  },[]);

  return (
    <div className="express-checkout-btn" ref={paypalRef} />
  );
}
