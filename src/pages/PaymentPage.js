import React, { useState } from 'react';
import axios from 'axios';

const PaymentPage = ({ bookingId }) => {
  const [paymentUrl, setPaymentUrl] = useState('');

  const handlePayment = async () => {
    try {
      const res = await axios.post('/api/payment/create', { 
        bookingId 
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setPaymentUrl(res.data.paymentUrl);
      window.location.href = res.data.paymentUrl;
    } catch (err) {
      console.error('Payment error:', err);
    }
  };

  return (
    <div className="payment-page">
      <h3>Complete Your Payment</h3>
      <button onClick={handlePayment} className="crypto-btn">
        Pay with Cryptocurrency
      </button>
      {paymentUrl && (
        <p>Redirecting to payment gateway...</p>
      )}
    </div>
  );
};

export default PaymentPage;