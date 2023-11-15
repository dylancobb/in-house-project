import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import icon from './arrowBtn.svg'

interface ButtonProps {
  currentSlide: number
  stateUsername: string
}
interface GameItem {
  game_id: number
  game_state: string
  game_stats: {
    players: any[]
  }
}
const StartButton = ({ currentSlide, stateUsername }: ButtonProps) => {
  const [latestGameId, setLatestGameId] = useState<number | null>(null)

  useEffect(() => {
    const apiUrl =
      'https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items?&Operation=GetMaxGameID'

    fetch(apiUrl, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const maxGameID = Math.max(
            ...data.map((item: GameItem) => item.game_id)
          )
          setLatestGameId(maxGameID)
        } else {
          console.error('No game data found.')
        }
      })
      .catch((error) => {
        console.error('Error fetching latest game ID:', error)
      })
  }, [])

  const handleClick = async () => {
    console.log(latestGameId)
    console.log(stateUsername)
    const urlParams = new URLSearchParams(window.location.search)
    const urlGameID = urlParams.get('game_id')

    if (urlGameID) {
      console.log('url game id', urlGameID)

      const apiUrl = `https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items/${urlGameID}`

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
        })

        if (!response.ok) {
          console.error('Error fetching existing game data:', response.status)
          return Promise.reject('Error fetching existing game data')
        }

        const data = await response.json()

        if (data && data.game_stats && data.game_stats.players) {
          const newPlayerId = data.game_stats.players.length + 1

          const newPlayer = {
            player_id: newPlayerId,
            player_avatar: `${currentSlide}`,
            player_username: `${stateUsername}`,
            player_prompt: ``,
            player_drawing: ``,
            player_guess: ``,
          }

          const updatedPlayers = [...data.game_stats.players, newPlayer]

          const updatedGame = {
            ...data,
            game_state: 'lobby',
            game_stats: {
              ...data.game_stats,
              players: updatedPlayers,
            },
          }

          const putResponse = await fetch(apiUrl, {
            method: 'PUT',
            body: JSON.stringify(updatedGame),
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (putResponse.ok) {
            console.log('New player added to the game')
            window.location.href = `/${urlGameID}/${stateUsername}/lobby`
          } else {
            console.error(
              'Error updating game with new player:',
              putResponse.status
            )
          }
        }
      } catch (error) {
        console.error('Error:', error)
      }
    } else if (latestGameId !== null) {
      try {
        const newGameID = latestGameId + 1

        const newGame = {
          game_id: newGameID,
          game_state: 'lobby',
          game_stats: {
            players: [
              {
                player_id: 1,
                player_avatar: `${currentSlide}`,
                player_username: `${stateUsername}`,
                player_prompt: ``,
                player_drawing: ``,
                player_guess_drawing: ``,
                player_guess_text: ``,
              },
            ],
          },
        }

        console.log(newGame)

        const apiUrl =
          'https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items'

        const response = await fetch(apiUrl, {
          method: 'POST',
          body: JSON.stringify(newGame),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          console.log('Game ID added to DynamoDB:', newGameID)
          window.location.href = `/${latestGameId + 1}/${stateUsername}/lobby`
        } else {
          console.error('Error adding game ID:', response.status)
        }
      } catch (error) {
        console.error('Error:', error)
      }
    } else {
      console.error('Latest game ID is not available.')
    }
  }

  return (
    <button
      onClick={handleClick}
      className='flex items-center gap-2 py-1 px-3 h-12 w-32 bg-green rounded-md shadow-md shadow-dark_blue'
    >
      <Image src={icon} alt='arrow icon' height={40} width={40} />
      START
    </button>
  )
}

export default StartButton
