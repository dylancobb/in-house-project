'use client';

import Button from './components/Button/Button';
import AvatarSlider from './components/AvatarSlider/AvatarSlider';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <AvatarSlider />
      <Button />
    </main>
  );
}
