'use client'

import React, {useEffect} from 'react'



const Results = () => {
        useEffect(() => {
          // Use window.location inside useEffect to ensure it's executed on the client side
          const idUrl = window.location.href;
          console.log("HREF " + idUrl);
      
          const apiUrl =
            "https://4oqenpdzm6.execute-api.eu-west-2.amazonaws.com/dev/items?&Operation=GetMaxGameID";
      
          fetch(apiUrl, {
            method: "GET",
          })
            .then((response) => response.json())
            .then((data) => {
              if (data && data.length > 0) {
                console.log(data);
              } else {
                console.error("No game data found.");
              }
            })
            .catch((error) => {
              console.error("Error fetching latest game ID:", error);
            });
        }, []); // The empty dependency array ensures that this useEffect runs only once, similar to componentDidMount
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-10">results</main>
  )
}

export default Results