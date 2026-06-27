import React from 'react';
import './FloatingBees.css';

const FloatingBees = () => {
  return (
    <div className="floating-bees-container">
      <img src="/bees/bee1.png" alt="Stoned Bee 1" className="floating-bee bee-1" />
      <img src="/bees/bee2.png" alt="Stoned Bee 2" className="floating-bee bee-2" />
      <img src="/bees/bee3.png" alt="Stoned Bee 3" className="floating-bee bee-3" />
    </div>
  );
};

export default FloatingBees;
