import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import icon from './link.svg'

const InviteButton = () => {
  const [extractedGameId, setExtractedGameId] = useState('')
  const [urlParts, setUrlParts] = useState<string[]>([])

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
    console.log('Clicked!')
    console.log(extractedGameId)
    let gameIdUrl = `${urlParts[0]}${urlParts[1]}${urlParts[2]}?game_id=${extractedGameId}`
    console.log(gameIdUrl)

    try {
      await navigator.clipboard.writeText(gameIdUrl)
      console.log('Game ID URL copied to clipboard:', gameIdUrl)
    } catch (err) {
      console.error('Unable to copy to clipboard:', err)
    }
  }

  return (
    <button className='btn bg-light_blue ' onClick={handleClick}>
      <Image src={icon} alt='arrow icon' height={40} width={40} />
      INVITE
    </button>
  )
}

export default InviteButton
