'use client'

import React, { useRef, useState, useEffect } from 'react'
import WhiteBoard from '../../../components/WhiteBoard'
import SubmitButton from '../../../components/Button/SubmitButton'
import uploadCanvas from '../../../utilities/uploadCanvas'
import turnTakenFunction from '@/app/utilities/turnTakenFunction'
import isRoundOverFunction from '@/app/utilities/isRoundOver'
import NextRoundButton from '@/app/components/Button/nextRoundButton'
import fetchPromptFunction from '@/app/utilities/fetchPromptFunction'

const Draw = () => {
  const currentUrl = window.location.href
  const parts = currentUrl.split('/')
  let urlGameID = parts[3]
  let urlUsername = parts[4]

  console.log(urlGameID)
  console.log(urlUsername)

  const [drawing, setDrawing] = useState('')
  const [turnTaken, setTurnTaken] = useState(false)
  const [roundOver, setRoundOver] = useState('')
  const [drawingPrompt, setDrawingPrompt] = useState('Prompt loading...')

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const isTurnTaken = await turnTakenFunction(
        urlGameID,
        urlUsername,
        'player_drawing'
      )
      console.log('Is turn taken?', isTurnTaken)
      setTurnTaken(isTurnTaken)

      const isRoundOver = await isRoundOverFunction(urlGameID, 'player_drawing')
      console.log('Is round over?', isRoundOver)
      setRoundOver(isRoundOver)
    }

    fetchData()
  }, [urlGameID, urlUsername])

  useEffect(() => {
    const fetchPrompt = async () => {
      const fetchedPrompt = await fetchPromptFunction(urlGameID, urlUsername)
      console.log('Fetched prompt:', fetchedPrompt)
      setDrawingPrompt(fetchedPrompt)
    }

    fetchPrompt()
  }, [urlGameID])

  const saveCanvas = async () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL()
      console.log('Submit clicked')
      console.log(dataUrl)

      try {
        // Upload the image and get the URL
        const imageUrl = await uploadCanvas(dataUrl)

        // Set the drawing state with the image URL
        await setDrawing(imageUrl)
        console.log(drawing)

        // Update DynamoDB with the image URL
        await updateDrawingInDynamoDB(imageUrl)

        setTurnTaken(true)
      } catch (error) {
        console.error('Error saving canvas:', error)
        // Handle the error as needed
      }
    }
  }

  const updateDrawingInDynamoDB = async (imageUrl: string) => {
    try {
      let apiUrl = `https://8494ibofxk.execute-api.eu-west-2.amazonaws.com/dev/items/${urlGameID}`

      const response = await fetch(apiUrl, {
        method: 'GET',
      })

      const data = await response.json()

      // Access the 'players' property of 'game_stats'
      const players = data.game_stats.players

      // Find the current player
      const currentPlayer = players.find(
        (player) => player.player_username === urlUsername
      )

      // Update the "player_drawing" for the current player in memory
      currentPlayer.player_drawing = imageUrl

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
      // Handle the error as needed
    }
  }

  return (
    <main className='flex min-h-screen flex-col items-center py-2'>
      <h1 className='text-5xl'>Draw</h1>
      {turnTaken ? (
        <p>Please wait for all players to finish the round...</p>
      ) : (
        <>
          <p className='text-white text-lg'>{drawingPrompt}</p>
          <WhiteBoard canvasRef={canvasRef} />
          <SubmitButton onClick={saveCanvas} />
        </>
      )}
      {roundOver ? (
        <NextRoundButton
          urlGameID={urlGameID}
          urlUsername={urlUsername}
          round='guess'
        />
      ) : null}
    </main>
  )
}

export default Draw
