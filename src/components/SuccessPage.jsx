import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const sessionId = query.get('session_id');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      const response = await fetch(`http://localhost:3000/success?session_id=${sessionId}`, {
        method: 'GET', // Change to GET
      });

      if (!response.ok) {
        console.error("Failed to fetch payment details.");
      } else {
        const data = await response.json();
        console.log("Payment details:", data);
      }
    };

    if (sessionId) {
      fetchPaymentDetails();
    }
  }, [sessionId]);

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Thank you for your order. We will send you an email confirmation shortly.</p>
    </div>
  );
};

export default SuccessPage;
