'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Input from '../../../components/Input'
import SubmitButton from '../../../components/Button/SubmitButton'
import turnTakenFunction from '@/app/utilities/turnTakenFunction'
import isRoundOverFunction from '@/app/utilities/isRoundOver'
import notepad from '@/public/images/sliderIcons/pen.svg'
import NextRoundButton from '@/app/components/Button/nextRoundButton'
import RandomPromptButton from '@/app/components/Button/RandomPromptButton'

export default function Prompt() {
  const currentUrl = window.location.href
  const parts = currentUrl.split('/')
  let urlGameID = parts[3]
  let urlUsername = parts[4]

  console.log(urlGameID)
  console.log(urlUsername)

  const [prompt, setPrompt] = useState('')
  const [turnTaken, setTurnTaken] = useState(false)
  const [roundOver, setRoundOver] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const isTurnTaken = await turnTakenFunction(
        urlGameID,
        urlUsername,
        'player_prompt'
      )
      console.log('Is turn taken?', isTurnTaken)
      setTurnTaken(isTurnTaken)

      const isRoundOver = await isRoundOverFunction(
        parseInt(urlGameID),
        'player_prompt'
      )
      console.log('Is round over?', isRoundOver)
      setRoundOver(isRoundOver)
    }

    fetchData()
  }, [urlGameID, urlUsername])

  function savePrompt() {
    console.log(prompt)
    // Update DynamoDB entry for the current player's "player_prompt"
    const updatePromptInDynamoDB = async () => {
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

        // Update the "player_prompt" for the current player in memory
        currentPlayer.player_prompt = prompt

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
    updatePromptInDynamoDB()

    setTurnTaken(true)
  }

  return (
    <main className='flex min-h-screen flex-col items-center py-10'>
      <h1 className='text-5xl'>Prompt</h1>
      <div className='flex flex-col items-center my-6 space-y-5'>
        {turnTaken ? (
          <h2 className='text-2xl'>
            Please wait for all players to finish the round...
          </h2>
        ) : (
          <>
            <p className='text-white text-xl'>Write a quirky sentence:</p>
            <Image
              src={notepad}
              alt='notepad'
              height={100}
              width={100}
              priority={true}
            />
            <Input setFunction={setPrompt} label='' placeholder='...' />
            <SubmitButton onClick={savePrompt} />
            <RandomPromptButton />
          </>
        )}
        {roundOver ? (
          <NextRoundButton
            urlGameID={urlGameID}
            urlUsername={urlUsername}
            round='draw'
          />
        ) : null}
      </div>
    </main>
  )
}
