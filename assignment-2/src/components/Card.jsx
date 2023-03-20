import React from 'react';
import { Avatar } from './Avatar';

export const Card = ({ name, photo, location, dateApplied, stageName }) => {
  return (
    <div
      className={`${
        (stageName === 'Hired' && 'border-2 border-green-500') ||
        (stageName === 'Rejected' && 'border-2 border-red-500')
      } mx-2 mb-3 flex cursor-pointer space-x-2 rounded-[5px] bg-white px-2 py-3 shadow-md`}
    >
      <div className='mx-2'>
        <Avatar name={name} photo={photo} />
      </div>
      <div className='flex flex-col -space-y-0.5'>
        <p className='text-sm'>Name: {name}</p>
        <p className='text-sm'>Stage: {stageName}</p>
        <p className='text-sm'>Location: {location}</p>
        <p className='text-sm'>Date Applied: {dateApplied}</p>
      </div>
    </div>
  );
};
