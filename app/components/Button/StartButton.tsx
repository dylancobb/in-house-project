import React, { useState, useEffect } from "react";
import Image from "next/image";
import icon from "./arrowBtn.svg";
import getAvatarUrl from "@/app/utilities/getAvatarUrl";
import Link from "next/link";

interface ButtonProps {
  currentSlide: number;
  stateUsername: string;
}
interface GameItem {
  game_id: number;
  game_state: string;
  game_stats: {
    players: any[];
  };
}
const StartButton = ({ currentSlide, stateUsername }: ButtonProps) => {
  const [latestGameId, setLatestGameId] = useState<number | null>(null);
  // const [buttonLink, setButtonLink] = useState('');

  useEffect(() => {
    const apiUrl =
      "https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items?&Operation=GetMaxGameID";

    fetch(apiUrl, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const maxGameID = Math.max(
            ...data.map((item: GameItem) => item.game_id)
          );
          setLatestGameId(maxGameID);
        } else {
          console.error("No game data found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching latest game ID:", error);
      });
  }, []);

  const handleClick = () => {
    console.log(latestGameId);
    // console.log(getAvatarUrl(currentSlide));
    // console.log(username.value);
    console.log(stateUsername);
    const urlParams = new URLSearchParams(window.location.search);
    const urlGameID = urlParams.get("game_id");

    

    if (urlGameID) {
      console.log('url game id', urlGameID)
      // setButtonLink(`/${urlGameID}/${stateUsername}/lobby`);
      window.location.href =`/${urlGameID}/${stateUsername}/lobby`;
    } else if (latestGameId !== null) {
      const newGameID = latestGameId + 1;

      const newGame = {
        game_id: newGameID,
        game_state: "Lobby",
        game_stats: {
          players: [
            {
              player_id: 1,
              player_avatar: `${currentSlide}`,
              player_username: `${stateUsername}`,
            },
          ],
        },
      };
      console.log(newGame);

      // setButtonLink(`/${latestGameId + 1}/${stateUsername}/lobby`);

      const apiUrl =
        "https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items";

      fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(newGame),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("Game ID added to DynamoDB:", newGameID);
            window.location.href =`/${latestGameId + 1}/${stateUsername}/lobby`;
          } else {
            console.error("Error adding game ID:", response.status);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.error("Latest game ID is not available.");
    }
  };

  // let link = `/${latestGameId + 1}/${stateUsername}/lobby`;

  return (
    // <Link href={buttonLink}>
      <button
        onClick={handleClick}
        className="flex items-center gap-2 py-1 px-3 h-15 w-50 bg-green rounded-md shadow-md shadow-dark_blue"
      >
        <Image src={icon} alt="arrow icon" height={40} width={40} />
        START
      </button>
     // </Link> 
  );
};

export default StartButton;
