import React, { useEffect, useState } from "react";
import avatar1 from '../../public/images/avatars/avatar1.jpg';
import avatar2 from '../../public/images/avatars/avatar2.jpg';
import Image from 'next/image';



// Get the current URL
const currentUrl = window.location.href;

// Split the URL by "/"
const urlParts = currentUrl.split('/');

// Extract the values of game_id and username
const gameId = parseInt(urlParts[3]);
const username = urlParts[4];

// Now you can use gameId and username in your code
console.log('Game ID:', gameId);
console.log('Username:', username);

// UserProfiles will be displayed through a loop, this is just temporary
const UserProfiles = () => {

    const [playersArray, setPlayersArray] = useState([]);


  useEffect(() => {
    const apiUrl = "https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items";
  
    // Fetch the data when the component is rendered
    fetch(apiUrl, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
  
        // Find the game with the specified ID
        const specificGame = data.find((game: any) => game.game_id === gameId);
  
        if (specificGame) {
          console.log("Found game:", specificGame);
          // Now you can handle the specific game here
          setPlayersArray(specificGame.game_stats.players);
          // console.log("playersArray", playersArray);
        } else {
          console.log("Game not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching latest game ID:", error);
      });
  }, []);

    // Log the updated state after it has been set
    useEffect(() => {
      console.log("playersArray", playersArray);
      console.log("avatar url", playersArray);
    }, [playersArray]);
  
  
  return (
    <>
      <div className="flex flex-col gap-2 ">
        {playersArray.map((player) => (
          <div key={player.player_id} className="flex justify-around items-center p-2">
            <Image
              // src={`https://res.cloudinary.com/dypg1icpd/image/upload/v1699014570/samples/animals/cat.jpg`}
              src={`/images/avatars/avatar${player.player_avatar}.jpg`}
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

  
  // return (
  //   <>
  //     <div className="flex flex-col gap-2 ">
  //       <div className="flex justify-around items-center p-2">
  //         <Image
  //           key={1}
  //           src={avatar1}
  //           width={40}
  //           height={40}
  //           alt="userAvatar"
  //           priority={true}
  //         />
  //         <p>User1</p>
  //       </div>
  //       <div className="flex w-28 justify-around items-center">
  //         <Image
  //           key={2}
  //           src={avatar2}
  //           width={40}
  //           height={40}
  //           alt="userAvatar"
  //           priority={true}
  //         />
  //         <p>User2</p>
  //       </div>
  //     </div>
  //   </>
  // );
};

export default UserProfiles;
