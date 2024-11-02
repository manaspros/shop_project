// SuccessPage.jsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');

    // If payment was successful, redirect to home page
    if (paymentStatus === 'success') {
      setTimeout(() => {
        navigate('/');
      }, 3000); // Redirect after 3 seconds (optional delay)
    }
  }, [navigate]);

  return (
    <div className="center">
      <h2>Payment successful!</h2>
      <p>You will be redirected to the home page shortly.</p>
    </div>
  );
}

export default SuccessPage;
