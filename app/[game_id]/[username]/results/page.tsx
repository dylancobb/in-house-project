'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface Player {
  player_id: number
  player_username: string
  player_avatar: string
  // Add more properties as needed
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

  //   return (
  //     <main className='flex min-h-screen flex-col items-center justify-between py-10'>
  //       <div>
  //         {players ? (
  //           players.map((player, index) => {
  //             if (index !== players.length - 1) {
  //               return (
  //                 <div key={player.player_id}>
  //                   <div>
  //                     <p>Username: {player.player_username}</p>
  //                     <p>Avatar: {player.player_avatar}</p>
  //                     <p>Prompt: {player.player_prompt}</p>
  //                   </div>
  //                   <Image
  //                     className='bg-white'
  //                     src={players[index + 1].player_drawing}
  //                     width={200}
  //                     height={200}
  //                     alt="player's painting"
  //                     priority={true}
  //                   />
  //                   <p>Guess: {players[index + 2].player_guess}</p>
  //                 </div>
  //               )
  //             } else if (index === players.length - 2) {
  //               {
  //                 return (
  //                   <div key={player.player_id}>
  //                     <div>
  //                       <p>Username: {player.player_username}</p>
  //                       <p>Avatar: {player.player_avatar}</p>
  //                       <p>Prompt: {player.player_prompt}</p>
  //                     </div>
  //                     <Image
  //                       className='bg-white'
  //                       src={players[2].player_drawing}
  //                       width={200}
  //                       height={200}
  //                       alt="player's painting"
  //                       priority={true}
  //                     />
  //                     <p>Guess: {players[0].player_guess}</p>
  //                   </div>
  //                 )
  //               }
  //             } else {
  //               return (
  //                 <div key={player.player_id}>
  //                   <div>
  //                     <p>Username: {player.player_username}</p>
  //                     <p>Avatar: {player.player_avatar}</p>
  //                     <p>Prompt: {player.player_prompt}</p>
  //                   </div>
  //                   <Image
  //                     className='bg-white'
  //                     src={players[0].player_drawing}
  //                     width={200}
  //                     height={200}
  //                     alt="player's painting"
  //                     priority={true}
  //                   />
  //                   <p>Guess: {players[1].player_guess}</p>
  //                 </div>
  //               )
  //             }
  //           })
  //         ) : (
  //           <p>Loading...</p>
  //         )}
  //       </div>
  //       results
  //     </main>
  //   )
  // }
  return (
    <main className='flex min-h-screen flex-col items-center justify-between py-10'>
      <div>
        {players ? (
          players.map((player, index) => {
            const nextIndex = (index + 1) % players.length
            const nextNextIndex = (index + 2) % players.length

            return (
              <div key={player.player_id}>
                <div>
                  <p>Username: {player.player_username}</p>
                  <p>Prompt: {player.player_prompt}</p>
                </div>
                <Image
                  className='bg-white'
                  src={players[nextIndex].player_drawing}
                  width={200}
                  height={200}
                  alt="player's painting"
                  priority={true}
                />
                <p>Guess: {players[nextNextIndex].player_guess}</p>
              </div>
            )
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
      results
    </main>
  )
}
export default Results
