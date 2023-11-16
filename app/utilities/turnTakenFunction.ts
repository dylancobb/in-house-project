export default async function turnTakenFunction(gameId, username, round) {
  try {
    let apiUrl = `https://8494ibofxk.execute-api.eu-west-2.amazonaws.com/dev/items/${gameId}`

    const response = await fetch(apiUrl, {
      method: 'GET',
    })

    const data = await response.json()

    // Access the 'players' property of 'game_stats'
    const players = data.game_stats.players

    // Find the player with the given 'username'
    const currentPlayer = players.find(
      (player) => player.player_username === username
    )

    // Check if the property with the name stored in 'round' for the current player is not empty
    const isPropertyNotEmpty =
      currentPlayer && currentPlayer[round].trim() !== ''

    return isPropertyNotEmpty
  } catch (error) {
    // Handle errors here
    console.error('Error fetching data:', error)
    // Return false in case of an error
    return false
  }
}
