'use client';

import StartButton from './components/Button/StartButton';
import AvatarSlider from './components/AvatarSlider/AvatarSlider';
import InstructionsSlider from './components/InstructionsSlider/InstructionsSlider';
import Input from './components/Input';
import { useState } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-10">
      <InstructionsSlider />
      <AvatarSlider setCurrentSlide={setCurrentSlide} />
      <Input />
      <StartButton currentSlide={currentSlide} />
    </main>
  );
}
