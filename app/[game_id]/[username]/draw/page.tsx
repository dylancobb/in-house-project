'use client'

import React, { useRef, useState } from 'react';
import WhiteBoard from '../../../components/WhiteBoard';
import SubmitButton from '../../../components/Button/SubmitButton';
import uploadCanva from '../../../utilities/uploadCanva';

const Draw = () => {
  const currentUrl = window.location.href;
  const parts = currentUrl.split('/');
  let urlGameID = parts[3];
  let urlUsername = parts[4];

  console.log(urlGameID);
  console.log(urlUsername);

  const [drawing, setDrawing] = useState("");
  const [turnTaken, setTurnTaken] = useState("");
  const [roundOver, setRoundOver] = useState("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const saveCanvas = async () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL();
      console.log('Submit clicked');
      console.log(dataUrl);

      try {
        // Upload the image and get the URL
        const imageUrl = await uploadCanva(dataUrl);

        // Set the drawing state with the image URL
        await setDrawing(imageUrl);
        console.log(drawing);

        // Update DynamoDB with the image URL
        await updateDrawingInDynamoDB(imageUrl);

        setTurnTaken(true);
      } catch (error) {
        console.error("Error saving canvas:", error);
        // Handle the error as needed
      }
    }
  };

  const updateDrawingInDynamoDB = async (imageUrl: string) => {
    try {
      let apiUrl = `https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items/${urlGameID}`;

      const response = await fetch(apiUrl, {
        method: "GET",
      });

      const data = await response.json();

      // Access the 'players' property of 'game_stats'
      const players = data.game_stats.players;

      // Find the current player
      const currentPlayer = players.find((player) => player.player_username === urlUsername);

      // Update the "player_drawing" for the current player in memory
      currentPlayer.player_drawing = imageUrl;

      // Update the DynamoDB entry
      await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("DynamoDB entry updated successfully.");
    } catch (error) {
      console.error("Error updating DynamoDB entry:", error);
      // Handle the error as needed
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center py-2">
      <WhiteBoard canvasRef={canvasRef} />
      <SubmitButton onClick={saveCanvas} />
    </main>
  );
};

export default Draw;
