'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import UserProfiles from '../../../components/UserProfiles'
import InviteButton from '../../../components/Button/InviteButton'
import LobbyStartButton from '../../../components/Button/LobbyStartButton'
interface GameItem {
  game_id: number
  game_state: string
  game_stats: {
    players: any[]
  }
}

export default function Lobby() {
  const pathName = usePathname().split('/')
  const usernameInPath = pathName[2]
  const game_id = pathName[1]

  const [gameItem, setGameItem] = useState<any | null>(null)
  const [canClick, setCanClick] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (game_id) {
        const apiUrl = `https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items/${game_id}`

        try {
          const response = await fetch(apiUrl, {
            method: 'GET',
          })

          if (response.ok) {
            const data: GameItem = await response.json()

            if (data && data.game_stats && data.game_stats.players) {
              setGameItem(data)

              // Determine if the player can click the button
              setCanClick(
                data.game_stats.players.length > 2 &&
                data.game_stats.players[0].player_username === usernameInPath
              )
            }
          } else {
            console.error('Error fetching game data:', response.status)
          }
        } catch (error) {
          console.error('Error:', error)
        }
      }
    }

    fetchData()
  }, [])

  if (!gameItem || !gameItem.game_stats) {
    return (
      <main className='flex min-h-screen flex-col items-center justify-between py-10'>
        <p>Loading...</p>
      </main>
    )
  } else {
    if (gameItem.game_state === 'lobby') {
      return (
        <main className='flex min-h-screen flex-col items-center justify-between py-10'>
          <h1>Lobby</h1>
          <UserProfiles gameItem={gameItem} />
          <div className='flex flex-col space-y-3 items-center'>
            <InviteButton />
            <LobbyStartButton
              canClick={canClick}
              urlGameID={game_id}
              urlUsername={usernameInPath}
              round="prompt"
            />
          </div>
        </main>
      )
    } else {window.location.href = `/${game_id}/${usernameInPath}/${gameItem.game_state}`}
  }
}
