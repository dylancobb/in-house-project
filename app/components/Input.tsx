import React from 'react';

const Input = () => {
  return (
    <>
      <div>
        <label htmlFor="userName"></label>
        <input
          className="flex justify-center p-2 rounded-md mix-blend-hard-difference border-2 border-solid border-green "
          type="text"
          id="userName"
          placeholder="Anonymous123"
        ></input>
      </div>
    </>
  );
};

export default Input;
