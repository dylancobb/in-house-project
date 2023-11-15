import React, { useState, useEffect } from 'react';

const RandomPromptButton = () => {
  const [randomSentence, setRandomSentence] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('https://loripsum.net/api/1/short/plaintext');
      const data = await response.text();
      setRandomSentence(data);
    } catch (error) {
      console.error('Error fetching random sentence:', error.message);
    }
  };

  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // Empty dependency array means this effect will only run once, equivalent to componentDidMount

  const handleClick = () => {
    // Call the fetchData function when the button is clicked
    fetchData();
    // You can use randomSentence here or perform any other action
    console.log(randomSentence);
  };

  return (
    <button
      onClick={handleClick}
      className='flex items-center gap-2 py-1 px-3 h-15 w-50 bg-green rounded-md shadow-md shadow-dark_blue'
    >
      Generate a random prompt!
    </button>
  );
};

export default RandomPromptButton;
