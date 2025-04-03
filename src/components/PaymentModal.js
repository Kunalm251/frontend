import React, { useState } from 'react';
import axios from 'axios';
import './PaymentModal.css';

const PaymentModal = ({ 
  totalAmount, 
  onConfirm, 
  onCancel,
  bookingId 
}) => {
  const [paymentMethod, setPaymentMethod] = useState('crypto');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    setIsProcessing(true);
    setError('');

    try {
      if (paymentMethod === 'crypto') {
        // Initiate cryptocurrency payment
        const res = await axios.post(
          '/api/payment/create',
          { bookingId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        // Redirect to payment gateway
        window.location.href = res.data.paymentUrl;
      } else {
        // For other payment methods (future implementation)
        onConfirm();
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.response?.data?.message || 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <h3>Complete Your Payment</h3>
        <p className="total-amount">Total: ${totalAmount.toFixed(2)}</p>

        <div className="payment-methods">
          <label className="payment-option">
            <input
              type="radio"
              name="paymentMethod"
              value="crypto"
              checked={paymentMethod === 'crypto'}
              onChange={() => setPaymentMethod('crypto')}
            />
            <span>Cryptocurrency (BTC/ETH/USDC)</span>
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              disabled
              onChange={() => setPaymentMethod('card')}
            />
            <span>Credit Card (Coming Soon)</span>
          </label>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="modal-actions">
          <button 
            className="cancel-btn"
            onClick={onCancel}
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            className="confirm-btn"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Confirm Payment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;