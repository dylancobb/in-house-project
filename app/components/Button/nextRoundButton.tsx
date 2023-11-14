import React from 'react';

interface Props {
    urlGameID: string;
    urlUsername: string;
  round: string;
}

const NextRoundButton: React.FC<Props> = ({ urlGameID, urlUsername, round }: Props) => {
  const handleClick = async () => {
    console.log('Button clicked!');

    try {
        let apiUrl = `https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items/${urlGameID}`;

        const response = await fetch(apiUrl, {
          method: "GET",
        });

        const data = await response.json();

        // Update the "game_state" for the current player in memory
        data.game_state = `${round}`;

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
      }

    window.location.href = `/${urlGameID}/${urlUsername}/${round}`;
  };

  return (
    <button
      className="flex items-center gap-2 py-1 px-3 h-15 w-50 light_blue rounded-md shadow-md bg-light_blue shadow-dark_blue"
      onClick={handleClick}
    >
      Next round!
    </button>
  );
};

export default NextRoundButton;
