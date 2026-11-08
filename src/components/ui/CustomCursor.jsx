import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    let rafId;
    let tx = -100, ty = -100; // dot (instant)
    let rx = -100, ry = -100; // ring (lagged)

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    const animate = () => {
      // ring lags behind dot
      rx += (tx - rx) * 0.12;
      ry += (ty - ry) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${tx}px, ${ty}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className={`cursor-dot  ${clicking ? 'cursor-dot--click'  : ''}`} />
      <div ref={ringRef} className={`cursor-ring ${clicking ? 'cursor-ring--click' : ''}`} />
    </>
  );
};

export default CustomCursor;
