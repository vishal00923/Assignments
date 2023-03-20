import React from 'react';

export const Avatar = ({ name, photo }) => {
  return <img className='h-10 w-10 rounded-full' src={photo} alt={name} />;
};
