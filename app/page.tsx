'use client';

import StartButton from './components/Button/StartButton';
import AvatarSlider from './components/AvatarSlider/AvatarSlider';
import { useState } from 'react';

export default function Home() {
  const [currentAvatar, setCurrentAvatar] = useState('');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <AvatarSlider setCurrentAvatar={setCurrentAvatar} />
      <StartButton currentAvatar={currentAvatar} />
    </main>
  );
}
