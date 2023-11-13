import React, { useEffect, useState } from "react";
import Image from "next/image";

interface UserProfilesProps {
  gameItem: {
    game_stats: {
      players: Array<{
        player_id: number;
        player_avatar: string;
        player_username: string;
        // Add other player properties if needed
      }>;
    };
  };
}

const UserProfiles: React.FC<UserProfilesProps> = ({ gameItem }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (gameItem && gameItem.game_stats && gameItem.game_stats.players) {
      setLoading(false);
    }
  }, [gameItem]);

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="flex flex-col gap-2">
        {gameItem.game_stats.players.map((player) => (
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
    );
  }
};

export default UserProfiles;
