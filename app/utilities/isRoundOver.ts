export default async function isRoundOverFunction(gameId, round) {
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

        // Check if every player has submitted for that round
        const isRoundOver = players.every(player => player[round].trim() !== '');

        return isRoundOver;
    } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
        // Return false in case of an error
        return false;
    }
}
