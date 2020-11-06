import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DataContext } from '../../context/dataState';
import Header from '../../components/header/Header';

const donationValues = [
  { id: 1, text: '$10', value: 10 },
  { id: 2, text: '$25', value: 25 },
  { id: 3, text: '$50', value: 50 },
  { id: 4, text: '$100', value: 100 },
  { id: 5, text: '$250', value: 250 },
  { id: 6, text: '$500', value: 500 },
];
export default function DonationPage() {
  const [coverFees, setCoverFees] = useState(true);
  const { handleSubmit, register, errors } = useForm();
  const { data, addDonation } = useContext(DataContext);

  async function onSubmit(values) {
    await handleNext(values.customAmount);
  }

  async function handleButton(values) {
    await handleNext(values);
  }

  async function handleNext(selectedAmount) {
    const userInputs = {
      amount: selectedAmount,
      coverFees: coverFees,
      isValid: true,
    };
    addDonation(userInputs);
  }

  if (data?.isValid) {
    return <Redirect to="/checkout" />;
  }

  return (
    <>
      <div className="wrapper">
        <Header text="Make a one-time gift today" />
        <div className="content">
          <div className="buttons-wrapper">
            {donationValues.map((donation) => (
              <button
                key={donation.id}
                className="donation-btn"
                value={donation.value}
                onClick={(e) => handleButton(e.target.value)}>
                {donation.text}
              </button>
            ))}
          </div>
          <div className="form-wrapper">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="inputs-wrapper">
                <div className="input-field-wrapper">
                  <input
                    name="customAmount"
                    className="input-field"
                    type="text"
                    placeholder="Name your own amount, maybe $44?"
                    ref={register({
                      pattern: {
                        value: /^([0-9]{2,6})$/,
                        message: 'Please enter a valid amount',
                      }
                    })}
                  />
                  <span className="error-text">
                    {errors.customAmount && errors.customAmount.message}
                  </span>
                </div>
                <div className="input-checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={coverFees}
                    onChange={() => setCoverFees(!coverFees)}
                    className="input-checkbox" />
                  <label className="label">I'll cover my transaction fees.</label>
                </div>
              </div>
              <button className="submit-btn">DONATE</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}