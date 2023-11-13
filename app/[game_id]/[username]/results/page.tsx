'use client'

import React, { useEffect, useRef, useState } from 'react'

const Results = () => {
  const [fetchData, setFetchData] = useState(null)

  useEffect(() => {
    // Use window.location inside useEffect to ensure it's executed on the client side
    const currentUrl = window.location.href

    // Split the URL by "/"
    const urlParts = currentUrl.split('/')
    // Extract the values of game_id and username
    const extractedGameId = parseInt(urlParts[3])
    console.log(
      'Make sure it s the right Id number from url: ' + extractedGameId
    )

    const apiUrl = `https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items/${extractedGameId}`

    fetch(apiUrl, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setFetchData(data)
          console.log(data)
          console.log(fetchData)
        } else {
          console.error('No game data found.')
        }
      })
      .catch((error) => {
        console.error('Error fetching latest game ID:', error)
      })
  }, [])

  useEffect(() => {
    console.log('Updated fetchData:', fetchData)
  }, [fetchData]) // The empty dependency array ensures that this useEffect runs only once, similar to componentDidMount

  return (
    <main className='flex min-h-screen flex-col items-center justify-between py-10'>
      <div></div>
      results
    </main>
  )
}

export default Results
