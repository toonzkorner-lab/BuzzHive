import React, { useState, useEffect } from 'react';
import './AgeGate.css';

const AgeGate = () => {
  const [isVerified, setIsVerified] = useState(true); // Default true to prevent flash
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Check local storage after mount
    const verified = localStorage.getItem('age_verified');
    if (verified !== 'true') {
      setIsVerified(false);
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleYes = () => {
    localStorage.setItem('age_verified', 'true');
    setIsVerified(true);
    document.body.style.overflow = 'auto';
  };

  const handleNo = () => {
    setShowError(true);
  };

  if (isVerified) return null;

  return (
    <div className="age-gate-overlay">
      <div className="age-gate-modal glass animate-fade-up">
        <div className="text-6xl mb-4 text-primary">🐝</div>
        <h2 className="text-3xl font-bold mb-4">Age Verification</h2>
        
        {!showError ? (
          <>
            <p className="mb-8 text-xl">Are you 21 years of age or older?</p>
            <div className="age-gate-buttons">
              <button onClick={handleYes} className="btn btn-primary w-full">Yes, I am 21+</button>
              <button onClick={handleNo} className="btn btn-outline w-full mt-4">No, I am under 21</button>
            </div>
            <p className="mt-6 text-sm text-muted">
              By entering this site you agree to our Terms and Conditions and Privacy Policy. You must be 21+ to purchase products from The Buzz Hive.
            </p>
          </>
        ) : (
          <div className="animate-fade-up">
            <h3 className="text-xl text-red-500 font-bold mb-4">Access Denied</h3>
            <p>You must be at least 21 years old to view this website or purchase our products.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeGate;
