import React from "react";
import Image from "next/image";
import icon from "./arrowBtn.svg";
import { useRouter } from "next/navigation";
import getAvatarUrl from "@/app/utilities/getAvatarUrl";
interface ButtonProps {
  currentSlide: number;
}

const StartButton = ({ currentSlide }: ButtonProps) => {
  const router = useRouter();
  const handleClick = () => {
    console.log(getAvatarUrl(currentSlide));

    const newGameID = 4; // Set the desired game ID explicitly

    const newGame = {
      game_id: newGameID,
      game_state: {
        players: [],
      },
    };

    // API endpoint URL for adding the new game row
    const apiUrl =
      "https://ktjsjzavwk.execute-api.eu-west-2.amazonaws.com/default/dynamoDBInteractions?TableName=IHP-Games";

    // Make a POST request to add the new game row
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
        } else {
          console.error("Error adding game ID:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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

export default StartButton;

// import React, { useState } from "react";
// import Image from "next/image";
// import icon from "./arrowBtn.svg";
// import getAvatarUrl from "@/app/utilities/getAvatarUrl";

// interface ButtonProps {
//   currentSlide: number;
// }

// const StartButton = ({ currentSlide }: ButtonProps) => {
//   const [games, setGames] = useState<any[]>([]);

//   const handleClick = () => {
//     console.log(getAvatarUrl(currentSlide));

//     // Fetch the games table contents
//     fetch(
//       "https://ktjsjzavwk.execute-api.eu-west-2.amazonaws.com/default/dynamoDBInteractions?TableName=IHP-Games",
//       {
//         method: "GET",
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         if (data && data.Items) {
//           setGames(data.Items);
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   return (
//     <div>
//       <button
//         onClick={handleClick}
//         className="flex items-center gap-2 py-1 px-3 h-15 w-50 bg-green rounded-md shadow-md shadow-dark_blue"
//       >
//         <Image src={icon} alt="arrow icon" height={40} width={40} />
//         START
//       </button>

//       {games.length > 0 && (
//         <div>
//           <h2>Games Table Contents:</h2>
//           <ul>
//             {games.map((game: any) => (
//               <li key={game.game_id}>{JSON.stringify(game)}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StartButton;

// import React from "react";
// import Image from "next/image";
// import icon from "./arrowBtn.svg";
// import getAvatarUrl from "@/app/utilities/getAvatarUrl";
// interface ButtonProps {
//   currentSlide: number; // Define the type of currentAvatar
// }

// const StartButton = ({ currentSlide }: ButtonProps) => {
//   const handleClick = () => {
//     console.log(getAvatarUrl(currentSlide));

//     fetch(
//       "https://ktjsjzavwk.execute-api.eu-west-2.amazonaws.com/default/dynamoDBInteractions?TableName=IHP-Games&Operation=GetMaxGameID",
//       {
//         method: "GET",
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         if (data && data.maxGameID) {
//           const maxGameID = parseInt(data.maxGameID, 10);
//           const newGameID = (maxGameID + 1).toString();

//           const newGame = {
//             game_id: newGameID,
//             game_state: {
//               players: [],
//             },
//           };

//           // API endpoint URL for adding the new game row
//           const apiUrl =
//             "https://ktjsjzavwk.execute-api.eu-west-2.amazonaws.com/default/dynamoDBInteractions?TableName=IHP-Games";

//           // Make a POST request to add the new game row
//           fetch(apiUrl, {
//             method: "POST",
//             body: JSON.stringify(newGame),
//             headers: {
//               "Content-Type": "application/json",
//             },
//           })
//             .then((response) => {
//               if (response.ok) {
//                 console.log("Game ID added to DynamoDB:", newGameID);
//               } else {
//                 console.error("Error adding game ID:", response.status);
//               }
//             })
//             .catch((error) => {
//               console.error("Error:", error);
//             });
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className="flex items-center gap-2 py-1 px-3 h-15 w-50 bg-green rounded-md shadow-md shadow-dark_blue"
//     >
//       <Image src={icon} alt="arrow icon" height={40} width={40} />
//       START
//     </button>
//   );
// };

// export default StartButton;

// import React from 'react';
// import Image from 'next/image';
// import icon from './arrowBtn.svg';
// import getAvatarUrl from '@/app/utilities/getAvatarUrl';
// interface ButtonProps {
//   currentSlide: number; // Define the type of currentAvatar
// }

// const StartButton = ({ currentSlide }: ButtonProps) => {
//   const handleClick = () => {
//     console.log(getAvatarUrl(currentSlide));
//   };
//   return (
//     <button
//       onClick={handleClick}
//       className="flex items-center gap-2 py-1 px-3 h-15 w-50 bg-green rounded-md shadow-md shadow-dark_blue"
//     >
//       <Image src={icon} alt="arrow icon" height={40} width={40} />
//       START
//     </button>
//   );
// };

// export default StartButton;
