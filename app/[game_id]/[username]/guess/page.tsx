'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import fetchDrawingFunction from '@/app/utilities/fetchDrawingFunction'
import Input from '../../../components/Input'
import SubmitButton from '../../../components/Button/SubmitButton'
import turnTakenFunction from '@/app/utilities/turnTakenFunction'
import isRoundOverFunction from '@/app/utilities/isRoundOver'
import NextRoundButton from '@/app/components/Button/nextRoundButton'

export default function Guess() {
  const currentUrl = window.location.href
  const parts = currentUrl.split('/')
  let urlGameID = parts[3]
  let urlUsername = parts[4]

  console.log(urlGameID)
  console.log(urlUsername)

  const [pictureLoaded, setPictureLoaded] = useState(false)
  const [drawingPrompt, setDrawingPrompt] = useState('')
  const [guess, setGuess] = useState('')

  const [turnTaken, setTurnTaken] = useState(false)
  const [roundOver, setRoundOver] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const isTurnTaken = await turnTakenFunction(
        urlGameID,
        urlUsername,
        'player_guess'
      )
      console.log('Is turn taken?', isTurnTaken)
      setTurnTaken(isTurnTaken)

      const isRoundOver = await isRoundOverFunction(
        parseInt(urlGameID),
        'player_guess'
      )
      console.log('Is round over?', isRoundOver)
      setRoundOver(isRoundOver)
    }

    fetchData()
  }, [urlGameID, urlUsername])

  useEffect(() => {
    const fetchDrawing = async () => {
      const fetchedDrawing = await fetchDrawingFunction(urlGameID, urlUsername)
      console.log('Fetched drawing:', fetchedDrawing)
      setDrawingPrompt(fetchedDrawing)
      setPictureLoaded(true)
    }

    fetchDrawing()
  }, [urlGameID, urlUsername])

  function saveGuess() {
    console.log(guess)

    const updateGuessInDynamoDB = async () => {
      try {
        let apiUrl = `https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items/${urlGameID}`

        const response = await fetch(apiUrl, {
          method: 'GET',
        })

        const data = await response.json()

        // Access the 'players' property of 'game_stats'
        const players = data.game_stats.players

        // Find the current player
        const currentPlayer = players.find(
          (player: { player_username: string }) =>
            player.player_username === urlUsername
        )

        // Update the "player_guess" for the current player in memory
        currentPlayer.player_guess = guess

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
    }

    // Call the function to update DynamoDB
    updateGuessInDynamoDB()

    setTurnTaken(true)
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between py-10'>
      <div className='flex flex-col items-center space-y-5'>
        {turnTaken ? (
          <p>Please wait for all players to finish the round...</p>
        ) : (
          <>
            <h1 className='text-5xl'>Guess!</h1>
            {!pictureLoaded ? (
              <p>Loading...</p>
            ) : (
              <>
                <Image
                  src={drawingPrompt}
                  alt='Drawing prompt.'
                  width={300}
                  height={300}
                  style={{ backgroundColor: 'white' }}
                />
                <Input setFunction={setGuess} label='' placeholder='...' />
                <SubmitButton onClick={saveGuess} />
              </>
            )}
          </>
        )}
        {roundOver ? (
          <NextRoundButton
            urlGameID={urlGameID}
            urlUsername={urlUsername}
            round='results'
          />
        ) : null}
      </div>
    </main>
  )
}
