import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserProfiles from "../../../components/UserProfiles";
import InviteButton from "../../../components/Button/InviteButton";
import LobbyStartButton from "../../../components/Button/LobbyStartButton";

interface GameItem {
  game_id: number;
  game_state: string;
  game_stats: {
    players: any[];
  };
}

export default function Lobby() {
  const router = useRouter();
  const { game_id } = router.query;
  const [gameItem, setGameItem] = useState<any | null>(null);
  const [canClick, setCanClick] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (game_id) {
        const apiUrl = `https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items/${game_id}`;

        try {
          const response = await fetch(apiUrl, {
            method: "GET",
          });

          if (response.ok) {
            const data: GameItem = await response.json();

            if (data && data.game_stats && data.game_stats.players) {
              setGameItem(data);

              // Determine if the player can click the button
              setCanClick(
                data.game_stats.players.length > 2 &&
                  data.game_stats.players[0].player_id === 1
              );
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
  }, [game_id]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-10">
      <h1>Lobby</h1>
      <UserProfiles gameItem={gameItem} game_id={game_id} />
      <InviteButton />
      <LobbyStartButton canClick={canClick} />
    </main>
  );
}
