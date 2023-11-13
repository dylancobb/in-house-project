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
  
  const LobbyStartButton: React.FC<LobbyStartButtonProps> = ({ canClick, username, game_id }) => {

    const handleClick = () => {
        console.log("woohoo");
    }

    return (
        <button
          onClick={handleClick}
          className={`flex items-center gap-2 py-1 px-3 h-15 w-50 ${canClick ? 'bg-green' : 'bg-gray-300'} rounded-md shadow-md shadow-dark_blue`}
          disabled={!canClick}
        >
          <Image src={icon} alt="arrow icon" height={40} width={40} />
          START
        </button>
      );
    
};

export default LobbyStartButton;
