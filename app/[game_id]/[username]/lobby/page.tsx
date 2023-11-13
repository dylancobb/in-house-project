'use client';
import React, { useEffect, useState } from 'react';
import UserProfiles from '../../../components/UserProfiles';
import InviteButton from '../../../components/Button/InviteButton';
import LobbyStartButton from '../../../components/Button/LobbyStartButton';

export default function Lobby() {
  const [canClick, setCanClick] = useState(false);
  const url = window.location.href.split('/');
  const game_id = url[3];
  const username = url[4];
  console.log(game_id, username);

  useEffect(() => {
 
    const fetchData = async () => {

      if (game_id) {
        const apiUrl = `https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items/${game_id}`;

        try {
          const response = await fetch(apiUrl, {
            method: "GET",
          });

          if (response.ok) {
            const data = await response.json();

            if (data && data.game_stats && data.game_stats.players && data.game_stats.players[0].player_id === 1)             
             {
              setCanClick(data.game_stats.players.length > 3);
            }
          } else {
            console.error("Error fetching game data:", response.status);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-10">
      <h1>Lobby</h1>
      <UserProfiles />
      <div className="flex flex-col space-y-">
        <InviteButton />
        <LobbyStartButton canClick={canClick} username={username} game_id={game_id} />
      </div>
    </main>
  );
}
