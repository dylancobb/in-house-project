import React from 'react';
import Image from 'next/image';
import icon from './link.svg';

const InviteButton = () => {
  // Get the current URL
  const currentUrl = window.location.href;

  // Split the URL by "/"
  const urlParts = currentUrl.split('/');

  // Extract the values of game_id and username
  const extractedGameId = parseInt(urlParts[3]);

  const handleClick = async () => {
    console.log('Clicked!');
    console.log(extractedGameId); 
    let gameIdUrl = `${urlParts[0]}${urlParts[1]}${urlParts[2]}?game_id=${extractedGameId}`
    console.log(gameIdUrl); 

    try {
      await navigator.clipboard.writeText(gameIdUrl);
      console.log('Game ID URL copied to clipboard:', gameIdUrl);
    } catch (err) {
      console.error('Unable to copy to clipboard:', err);
    }

   };

  return (
    <button
      className="flex items-center gap-2 py-1 px-3 h-15 w-50 light_blue rounded-md shadow-md bg-light_blue shadow-dark_blue"
      onClick={handleClick}
    >
      <Image src={icon} alt="arrow icon" height={40} width={40} />
      INVITE
    </button>
  );
};

export default InviteButton;
