import React, { useEffect, useState } from "react";
import Image from 'next/image';

const UserProfiles = () => {
  const [playersArray, setPlayersArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gameId, setGameId] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Get the current URL
    const currentUrl = window.location.href;

    // Split the URL by "/"
    const urlParts = currentUrl.split('/');

    // Extract the values of game_id and username
    const extractedGameId = parseInt(urlParts[3]);
    const extractedUsername = urlParts[4];

    // Now you can use gameId and username in your code
    console.log('Game ID:', extractedGameId);
    console.log('Username:', extractedUsername);

    setGameId(extractedGameId);
    setUsername(extractedUsername);

    const apiUrl = "https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items";

    // Fetch the data when the component is rendered
    fetch(apiUrl, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        // Find the game with the specified ID
        const specificGame = data.find((game) => game.game_id === extractedGameId);

        if (specificGame) {
          console.log("Found game:", specificGame);
          // Now you can handle the specific game here
          setPlayersArray(specificGame.game_stats.players);
        } else {
          console.log("Game not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching latest game ID:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching, regardless of success or failure
        console.log("Data fetched, loading set to false.");
      });
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  // Log the updated state after it has been set
  useEffect(() => {
    console.log("playersArray", playersArray);
  }, [playersArray, loading]);

  if (loading) {
    console.log('loading');
    return <p>Loading...</p>; // Display a loading message or spinner while fetching data
  } else {
    return (
      <>
        <div className="flex flex-col gap-2 ">
          {playersArray.map((player) => (
            <div key={player.player_id} className="flex justify-around items-center p-2">
              <Image
                src={`/images/avatars/avatar${parseInt(player.player_avatar) + 1}.jpg`}
                width={40}
                height={40}
                alt="userAvatar"
                priority={true}
              />
              <p>{player.player_username}</p>
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default UserProfiles;
