import React, { useEffect, useState } from 'react';

export const LoadingScreen = ({ onDone }) => {
  const [phase, setPhase] = useState('in'); // 'in' -> 'hold' -> 'out'

  useEffect(() => {
    // fade-in for 600ms, hold 400ms, fade-out 600ms
    const t1 = setTimeout(() => setPhase('hold'), 600);
    const t2 = setTimeout(() => setPhase('out'), 1000);
    const t3 = setTimeout(() => onDone && onDone(), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div className={`loading-screen loading-screen--${phase}`}>
      <div className="loading-screen__inner">
        <img src="/logo.png" alt="Socialita" className="loading-screen__logo" />
        <div className="loading-screen__bar">
          <div className="loading-screen__progress" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
