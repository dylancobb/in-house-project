import React from 'react'
import Image from 'next/image'
import icon from './arrowBtn.svg'

interface LobbyStartButtonProps {
  canClick: boolean
  urlGameID: string
  urlUsername: string
  round: string
}

const LobbyStartButton: React.FC<LobbyStartButtonProps> = ({
  canClick,
  urlGameID,
  urlUsername,
  round,
}) => {
  const handleClick = async () => {
    console.log('Button clicked!')

    try {
      let apiUrl = `https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items/${urlGameID}`

      const response = await fetch(apiUrl, {
        method: 'GET',
      })

      const data = await response.json()

      // Update the "game_state" for the current player in memory
      data.game_state = `${round}`

      // Update the DynamoDB entry
      await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      console.log('DynamoDB entry updated successfully.')
    } catch (error) {
      console.error('Error updating DynamoDB entry:', error)
    }

    window.location.href = `/${urlGameID}/${urlUsername}/${round}`
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 py-1 px-3 h-14 w-36
      ${canClick ? 'bg-green' : 'bg-grey/50 text-black/50'}
      rounded-md shadow-md shadow-dark_blue`}
      disabled={!canClick}
    >
      <Image src={icon} alt='arrow icon' height={40} width={40} />
      START
    </button>
  )
}

export default LobbyStartButton
