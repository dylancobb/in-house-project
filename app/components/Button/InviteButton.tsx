import React from 'react';
import Image from 'next/image';
import icon from './link.svg';

const InviteButton = () => {
  return (
    <button className="flex items-center gap-2 py-1 px-3 h-15 w-50 light_blue rounded-md shadow-md bg-light_blue shadow-dark_blue">
      <Image src={icon} alt="arrow icon" height={40} width={40} />
      INVITE
    </button>
  );
};

export default InviteButton;
