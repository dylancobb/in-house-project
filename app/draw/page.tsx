'use client';

import React, { useRef } from 'react';
import WhiteBoard from '../components/WhiteBoard';
import SubmitButton from '../components/Button/SubmitButton';
const Draw = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const saveCanvas = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL();
      console.log('Submit clicked');
      console.log(dataUrl);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center py-2">
      <WhiteBoard />
      <SubmitButton onClick={saveCanvas} />
    </main>
  );
};

export default Draw;
