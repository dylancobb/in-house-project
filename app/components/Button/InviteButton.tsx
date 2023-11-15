import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import icon from './link.svg'

const InviteButton = () => {
  const [extractedGameId, setExtractedGameId] = useState('');
  const [urlParts, setUrlParts] = useState<string[]>([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Get the current URL
    const currentUrl = window.location.href

    // Split the URL by "/"
    const parts = currentUrl.split('/')

    // Extract the values of game_id and username
    setExtractedGameId(parts[3])
    setUrlParts(parts)
  }, []) // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  const handleClick = async () => {
    let gameIdUrl = `${urlParts[0]}${urlParts[1]}${urlParts[2]}?game_id=${extractedGameId}`;
    setClicked(true);

    try {
      await navigator.clipboard.writeText(gameIdUrl)
      console.log('Game ID URL copied to clipboard:', gameIdUrl)
    } catch (err) {
      console.error('Unable to copy to clipboard:', err)
    }
  }

  return (
    <>
      <p className="h-6">{clicked ? 'Link copied to clipboard!' : ''}</p>
      <button
        className="flex items-center gap-2 py-1 px-3 h-12 w-32 light_blue rounded-md shadow-md bg-light_blue shadow-dark_blue"
        onClick={handleClick}
      >
        <Image src={icon} alt="arrow icon" height={40} width={40} />
        INVITE
      </button>
    </>
  );
};

export default InviteButton
