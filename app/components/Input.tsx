import React from 'react';

interface Props {
  setFunction: (value: string) => void;
  setUsernameValid?: (isValid: boolean) => void;
  label: string;
  placeholder: string;
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
}

const Input = ({
  setFunction,
  setUsernameValid,
  label,
  placeholder,
  maxLength,
  minLength,
  pattern,
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Add your validation logic here
    if (
      (maxLength && inputValue.length > maxLength) ||
      (minLength && inputValue.length < minLength) ||
      (pattern && !pattern.test(inputValue))
          ) {
            setUsernameValid && setUsernameValid(false)
      console.error('Invalid input!');
      return;
    }

    // Update the state if validation passes
    setFunction(inputValue);
    setUsernameValid && setUsernameValid(true)
  };

  return (
    <>
      <div>
        <label htmlFor={label}>{label}</label>
        <input
          className="flex justify-center p-2 rounded-md mix-blend-hard-difference border-2 border-solid border-green "
          type="text"
          id={label}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default Input;
