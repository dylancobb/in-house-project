import React, { useState, useEffect } from 'react';

const RandomPromptButton = () => {
  const [randomSentence, setRandomSentence] = useState('');

  const fetchData = async () => {
    try {
      const noun = await fetch('https://random-word-form.repl.co/random/noun');
      const dataNoun = await noun.json();
      const adjective = await fetch('https://random-word-form.repl.co/random/adjective');
      const dataAdjective = await adjective.json();
      const article = determineArticle(dataAdjective.toString());
      let sentence = `${article} ${dataAdjective} ${dataNoun}`;
      setRandomSentence(sentence);
      console.log(sentence);
    } catch (error) {
      console.error('Error fetching random sentence:', error.message, error.response);
    }
  };

  // Function to determine 'a' or 'an' based on the first letter of the adjective
  const determineArticle = (adjective) => {
    const firstLetter = adjective.charAt(0).toLowerCase();
    return 'aeiou'.includes(firstLetter) ? 'an' : 'a';
  };

  const handleClick = () => {
    fetchData();
  };

  return (
    <>
      <button
        onClick={handleClick}
        className='flex items-center gap-2 py-1 px-3 h-15 w-50 bg-green rounded-md shadow-md shadow-dark_blue'
      >
        Generate a random prompt!
      </button>
      <p>{randomSentence}</p>
    </>
  );
};

export default RandomPromptButton;
