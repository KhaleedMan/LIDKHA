import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import './StripePaymentModal.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function PaymentForm({ coursePrice, courseName, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage('');

    if (!stripe || !elements) {
      setErrorMessage('Payment processing is not available');
      setIsProcessing(false);
      return;
    }

    try {
      // Create payment intent on backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: coursePrice * 100 }),
      });

      const { clientSecret } = await response.json();

      // Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        onSuccess(result.paymentIntent.id);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="payment-info">
        <h3>{courseName}</h3>
        <p className="price">₦{coursePrice.toLocaleString()}</p>
      </div>

      <div className="card-element-wrapper">
        <CardElement className="card-element" />
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="payment-actions">
        <button
          type="submit"
          disabled={isProcessing}
          className="pay-button"
        >
          {isProcessing ? 'Processing...' : `Pay ₦${coursePrice.toLocaleString()}`}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="cancel-button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function StripePaymentModal({
  isOpen,
  coursePrice,
  courseName,
  onClose,
  onSuccess,
}) {
  if (!isOpen) return null;

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="payment-modal-header">
          <h2>Complete Payment</h2>
          <p>Secure payment powered by Stripe</p>
        </div>

        <Elements stripe={stripePromise}>
          <PaymentForm
            coursePrice={coursePrice}
            courseName={courseName}
            onSuccess={onSuccess}
            onCancel={onClose}
          />
        </Elements>
      </div>
    </div>
  );
}
