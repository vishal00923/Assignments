import React from 'react';

const Input = ({ type, name, label, value, handleChange }) => {
  return (
    <>
      <input
        onChange={handleChange}
        type={type}
        name={name}
        id={name}
        value={value}
        className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-black focus:border-blue-600 focus:outline-none dark:border-gray-600 dark:focus:border-blue-500'
        placeholder=' '
        required
      />
      <label
        htmlFor={name}
        className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
      >
        {label}
      </label>
    </>
  );
};

export default Input;
