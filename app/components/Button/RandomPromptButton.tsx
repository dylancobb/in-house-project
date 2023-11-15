import React, { useState, useEffect } from 'react';

const RandomPromptButton = () => {
  const [randomSentence, setRandomSentence] = useState('');

  const fetchData = async () => {
    try {
      const noun = await fetch('https://random-word-form.repl.co/random/noun');
      const dataNoun = await noun.json();
      const adjective = await fetch ('https://random-word-form.repl.co/random/adjective');
      const dataAdjective = await adjective.json();  
      let sentence = `a ${dataAdjective} ${dataNoun}`
      setRandomSentence(sentence);
      console.log(sentence); // Log the actual data
    } catch (error) {
      console.error('Error fetching random sentence:', error.message, error.response);
    }
  };

  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // Empty dependency array means this effect will only run once, equivalent to componentDidMount

  const handleClick = () => {
    fetchData();
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
