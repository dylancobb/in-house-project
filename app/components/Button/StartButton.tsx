import React from 'react';
import Image from 'next/image';
import icon from './arrowBtn.svg';
import getAvatarUrl from '@/app/utilities/getAvatarUrl';
interface ButtonProps {
  currentSlide: number; // Define the type of currentAvatar
}

const StartButton = ({ currentSlide }: ButtonProps) => {
  const handleClick = () => {
    console.log(getAvatarUrl(currentSlide));
  };
  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 py-1 px-3 h-15 w-50 bg-green rounded-md shadow-md shadow-dark_blue"
    >
      <Image src={icon} alt="arrow icon" height={40} width={40} />
      START
    </button>
  );
};

export default StartButton;