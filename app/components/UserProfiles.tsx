import React, { useEffect } from "react";
import avatar1 from '../../public/images/avatars/avatar1.jpg';
import avatar2 from '../../public/images/avatars/avatar2.jpg';
import Image from 'next/image';

// UserProfiles will be displayed through a loop, this is just temporary
const UserProfiles = () => {
  let playersArray = []

  useEffect(() => {
    const apiUrl = "https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items";
  
    // Fetch the data when the component is rendered
    fetch(apiUrl, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
  
        // Replace 'desiredGameId' with the specific game_id you're looking for
        const desiredGameId = 7;
  
        // Find the game with the specified ID
        const specificGame = data.find((game) => game.game_id === desiredGameId);
  
        if (specificGame) {
          console.log("Found game:", specificGame);
          // Now you can handle the specific game here
          playersArray = specificGame.game_stats.players;
          console.log("playersArray", playersArray);
        } else {
          console.log("Game not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching latest game ID:", error);
      });
  }, []);
  
  
  return (
    <>
      <div className="flex flex-col gap-2 ">
        <div className="flex justify-around items-center p-2">
          <Image
            key={1}
            src={avatar1}
            width={40}
            height={40}
            alt="userAvatar"
            priority={true}
          />
          <p>User1</p>
        </div>
        <div className="flex w-28 justify-around items-center">
          <Image
            key={2}
            src={avatar2}
            width={40}
            height={40}
            alt="userAvatar"
            priority={true}
          />
          <p>User2</p>
        </div>
      </div>
    </>
  );
};

export default UserProfiles;
