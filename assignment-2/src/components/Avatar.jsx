import React from 'react';

const Avatar = ({ name, photo }) => {
  return <img className='h-10 w-10 rounded-full' src={photo} alt={name} />;
};

export default Avatar;
