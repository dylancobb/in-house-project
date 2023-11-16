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

    const apiUrl = `https://8494ibofxk.execute-api.eu-west-2.amazonaws.com/dev/items/${extractedGameId}`

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
      <h1 className='text-5xl'>Results</h1>
      <div>
        {players ? (
          players.map((player, index) => {
            const nextIndex = (index + 1) % players.length
            const nextNextIndex = (index + 2) % players.length

            return (
              <div key={player.player_id} className='my-10 flex flex-col gap-3'>
                <h2 className='text-2xl'>Prompts:</h2>
                <div className='flex  items-center mt-1 '>
                  <Image
                    src={`/images/avatars/avatar${
                      parseInt(player.player_avatar) + 1
                    }.jpg`}
                    width={60}
                    height={60}
                    alt='userAvatar'
                    priority={true}
                    style={{ borderRadius: '50%' }}
                  />
                  <p className='ml-4 items-center py-2 px-6 border-2 border-solid border-green rounded-md '>
                    {player.player_prompt}
                  </p>
                </div>
                <div className='flex mt-1'>
                  <Image
                    src={`/images/avatars/avatar${
                      parseInt(players[nextIndex].player_avatar) + 1
                    }.jpg`}
                    width={60}
                    height={60}
                    alt='userAvatar'
                    priority={true}
                    style={{ borderRadius: '50%', alignSelf: 'flex-end' }}
                  />
                  {/* <p>{players[nextIndex].player_username}:</p> */}
                </div>
                <Image
                  className='bg-white'
                  src={players[nextIndex].player_drawing}
                  width={300}
                  height={300}
                  alt="player's painting"
                  priority={true}
                />
                <div className='flex items-center mt-1'>
                  <Image
                    src={`/images/avatars/avatar${
                      parseInt(players[nextNextIndex].player_avatar) + 1
                    }.jpg`}
                    width={60}
                    height={60}
                    alt='userAvatar'
                    priority={true}
                    style={{ borderRadius: '50%' }}
                  />

                  <p className='ml-4 items-center py-2 px-6 border-2 border-solid border-green rounded-md '>
                    {players[nextNextIndex].player_guess}
                  </p>
                </div>
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
