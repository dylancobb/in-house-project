import React from 'react';
import Image from 'next/image';
import icon from './arrowBtn.svg';

const Button = () => {
  return (
    <button className="flex items-center gap-2 py-1 px-3 h-15 w-50 bg-green rounded-md shadow-md shadow-dark_blue">
      {/* box-shadow: 0px 4px 0px 0px #1D3557; */}
      <Image src={icon} alt="arrow icon" height={40} width={40} />
      START
    </button>
  );
};

export default Button;
