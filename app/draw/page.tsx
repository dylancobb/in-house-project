'use client';

import React, { useRef } from 'react';
import WhiteBoard from '../components/WhiteBoard';
import SubmitButton from '../components/Button/SubmitButton';
import uploadCanva from '../utilities/uploadCanva';

const Draw = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const saveCanvas = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL();
      console.log('Submit clicked');
      console.log(dataUrl);
      uploadCanva(dataUrl);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center py-2">
      <WhiteBoard canvasRef={canvasRef} />
      <SubmitButton onClick={saveCanvas} />
    </main>
  );
};

export default Draw;
