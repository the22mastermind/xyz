import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/dataState';
import visaMC from '../../assets/images/visa_mc.png';
import momo from '../../assets/images/momo.png';
import airtel from '../../assets/images/airtel.jpeg';
import PayPal from '../../components/paypal/PayPal';
import Notification from '../../components/notification/Notification';

export default function CheckoutPage() {
  const { data, message } = useContext(DataContext);
  const [fees, setFees] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (data.coverFees) {
      const newFees = data.amount * 0.06;
      const newTotal = data.amount + newFees;
      setFees(newFees.toFixed(2));
      setTotal(newTotal.toFixed(2));
    } else {
      setTotal(data.amount.toString());
    }
  }, [data.amount, data.coverFees]);

  return (
    <>
      <div className="wrapper checkout-page">
        <div className="checkout-page-left">
          <div className="express-checkout">
            {message.status === 'error' ? <Notification /> : null}
            <h3 className="express-checkout-title">Express checkout</h3>
            <div className="express-checkout-items">
              <button className="express-checkout-btn">
                <img src={visaMC} className="payment-img" alt="visa" />
              </button>
              <PayPal total={total} />
              <button className="express-checkout-btn momo">
                <img src={momo} className="payment-img" alt="momo" />
              </button>
              <button className="express-checkout-btn airtel">
                <img src={airtel} className="payment-img" alt="airtel" />
              </button>
            </div>
          </div>
        </div>

        <div className="checkout-page-right">
          <div className="">
            <h3 className="donation-title">One-time Donation</h3>
            <div className="donation-contents">
              <div className="donation-description">${data?.amount} Donation</div>
              <div className="donation-amount">${data?.amount}</div>
            </div>
            {data?.coverFees ? (
              <div>
                <h3 className="donation-title">Fee Coverage</h3>
                <div className="donation-contents">
                  <div className="donation-description">
                    Processing fees for a ${data?.amount} Donation
                  </div>
                  <div className="donation-amount">${fees}</div>
                </div>
              </div>
            ) : null}
            <hr className="hr" />
            <div className="donation-contents total">
              <div className="donation-total">Total</div>
              <div className="total-amount">
                <span>USD</span>
                <span className="total-amount-text">${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
