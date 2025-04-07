import React, { useEffect } from 'react';
import { BOOKING_URL } from '../data/serviceCategories';

const Booking = () => {
  useEffect(() => {
    // Redirect to the external booking URL
    window.location.href = BOOKING_URL;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-salon-pink-50">
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-salon-pink-500 mx-auto mb-4"></div>
        <h1 className="text-2xl font-serif text-salon-pink-700 mb-2">Redirecting to Booking...</h1>
        <p className="text-gray-600">
          If you are not redirected automatically, please{' '}
          <a 
            href={BOOKING_URL} 
            className="text-salon-pink-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            click here
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Booking;
