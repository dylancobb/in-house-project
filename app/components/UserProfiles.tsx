import React, { useEffect, useState } from "react";
import Image from "next/image";

interface UserProfilesProps {
  game_id: string; // Assuming game_id is a string, update the type accordingly
}

const UserProfiles: React.FC<UserProfilesProps> = ({ game_id }) => {
  const [playersArray, setPlayersArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = `https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items/${game_id}`;

    fetch(apiUrl, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.game_stats && data.game_stats.players) {
          setPlayersArray(data.game_stats.players);
        } else {
          console.log("Game data not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching game data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [game_id]);

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <div className="flex flex-col gap-2">
          {playersArray.map((player) => (
            <div
              key={player.player_id}
              className="flex justify-around items-center p-2"
            >
              <Image
                src={`/images/avatars/avatar${
                  parseInt(player.player_avatar) + 1
                }.jpg`}
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
