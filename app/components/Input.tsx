import React from 'react';
interface Props {
  setFunction: (value: string) => void;
  label: string;
  placeholder: string;
}


const Input = ({setFunction, label, placeholder}: Props) => {
  return (
    <>
      <div>
        <label htmlFor={label}></label>
        <input
          className="flex justify-center p-2 rounded-md mix-blend-hard-difference border-2 border-solid border-green "
          type="text"
          id={label}
          placeholder={placeholder}
          onChange={(text) => setFunction(text.target.value)}

        ></input>
      </div>
    </>
  );
};

export default Input;
