'use client';

import React, { useEffect, useState } from 'react';
import UserProfiles from '../../../components/UserProfiles';
import InviteButton from '../../../components/Button/InviteButton';
import LobbyStartButton from '../../../components/Button/LobbyStartButton';

export default function Lobby() {
  const [canClick, setCanClick] = useState(false);
  const [gameId, setGameId] = useState();
  const [username, setUsername] = useState();
 

  useEffect(() => {
    const url = window.location.href;
    setGameId(url[3]);
    setUsername(url[4]);

    const apiUrl =
      "https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items?&Operation=GetMaxGameID";

    fetch(apiUrl, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.game_stats && data.game_stats.players && data.game_stats.players[0].player_id === 1) {
    
          setCanClick(true); 
   
        } else {
          console.error("No game data found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching latest game ID:", error);
      });
  }, []);

  const handleClick = async () => {
    
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-10">
      <h1>Lobby</h1>
      <UserProfiles />
      <div className="flex flex-col space-y-">
        <InviteButton />
        <LobbyStartButton canClick={canClick} username={username} game_id={gameId} />
      </div>
    </main>
  );
}
