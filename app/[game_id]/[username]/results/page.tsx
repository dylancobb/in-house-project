'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface Player {
  player_id: number
  player_username: string
  player_avatar: string
  player_prompt: string
  player_drawing: string
  player_guess: string
}

const Results: React.FC = () => {
  const [players, setPlayersData] = useState<Player[] | null>(null)

  useEffect(() => {
    const currentUrl = window.location.href
    const urlParts = currentUrl.split('/')
    const extractedGameId = parseInt(urlParts[3])

    const apiUrl = `https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items/${extractedGameId}`

    fetch(apiUrl, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setPlayersData(data.game_stats.players)
        } else {
          console.error('No game data found.')
        }
      })
      .catch((error) => {
        console.error('Error fetching latest game ID:', error)
      })
  }, [])

  console.log('Players array:', players)

  return (
    <main className='flex min-h-screen flex-col items-center justify-between py-10'>
      Results
      <div>
        {players ? (
          players.map((player, index) => {
            const nextIndex = (index + 1) % players.length
            const nextNextIndex = (index + 2) % players.length

            return (
              <div key={player.player_id} className='my-8'>
                <div>
                  <Image
                    src={`/images/avatars/avatar${
                      parseInt(player.player_avatar) + 1
                    }.jpg`}
                    width={40}
                    height={40}
                    alt='userAvatar'
                    priority={true}
                  />
                  <p>
                    {player.player_username} prompt: {player.player_prompt}
                  </p>
                </div>
                <div>
                  <p>{players[nextIndex].player_username}:</p>
                </div>
                <Image
                  className='bg-white'
                  src={players[nextIndex].player_drawing}
                  width={200}
                  height={200}
                  alt="player's painting"
                  priority={true}
                />
                <p>
                  {players[nextNextIndex].player_username} guess:{' '}
                  {players[nextNextIndex].player_guess}
                </p>
              </div>
            )
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  )
}
export default Results
