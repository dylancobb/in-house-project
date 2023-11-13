import React, { useState, useEffect } from "react";
import Image from "next/image";
import icon from "./arrowBtn.svg";

interface GameItem {
    game_id: number;
    game_state: string;
    game_stats: {
        players: any[];
    };
}
interface LobbyStartButtonProps {
    canClick: boolean;
    username: string;
    game_id: string;
  }
  
  const LobbyStartButton: React.FC<LobbyStartButtonProps> = ({ canClick, username, game_id }) => 
    const [latestGameId, setLatestGameId] = useState<number | null>(null);

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

    const handleClick = async () => {
        console.log(latestGameId);
        const urlParams = new URLSearchParams(window.location.search);
        const urlGameID = urlParams.get("game_id");


        console.log("url game id", urlGameID);

        const apiUrl = `https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items/${urlGameID}`;

        try {
            const response = await fetch(apiUrl, {
                method: "GET",
            });

            if (!response.ok) {
                console.error("Error fetching existing game data:", response.status);
                return Promise.reject("Error fetching existing game data");
            }

            const data = await response.json();

            if (data && data.game_stats && data.game_stats.players) {

                const putResponse = await fetch(apiUrl, {
                    method: "PUT",
                    body: JSON.stringify(updatedGame),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (putResponse.ok) {
                    console.log("New player added to the game");
                    window.location.href = `/${urlGameID}/${stateUsername}/prompt`;
                } else {
                    console.error(
                        "Error updating game with new player:",
                        putResponse.status
                    );
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <button
            onClick={handleClick}
            className="flex items-center gap-2 py-1 px-3 h-15 w-50 bg-green rounded-md shadow-md shadow-dark_blue"
        >
            <Image src={icon} alt="arrow icon" height={40} width={40} />
            START
        </button>
    );
};

export default LobbyStartButton;
