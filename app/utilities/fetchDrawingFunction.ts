export default async function fetchDrawingFunction(gameId, username) {
    try {
        let apiUrl = `https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items/${gameId}`;

        const response = await fetch(apiUrl, {
            method: "GET",
        });

        const data = await response.json();

        // Access the 'game_stats' property
        const gameStats = data.game_stats;

        // Access the 'players' property of 'game_stats'
        const players = gameStats.players;

        // Determine player ID
        let playerId = parseInt(players.find((player) => player.player_username === username).player_id);

        //Determine players in game
        let numberOfPlayers = players.length

        let promptPlayersId;

        if (playerId === 1) {
            promptPlayersId = parseInt(numberOfPlayers) - 1;
        } else if (playerId === 2) {
            promptPlayersId = parseInt(numberOfPlayers);
        } else {
            promptPlayersId = playerId - 2;
        }

        let drawingPrompt = players.find((player) => player.player_id === promptPlayersId).player_drawing

        return drawingPrompt;
    } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
        return ;
    }
}