import React from 'react';

import Avatar from './Avatar';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ id, name, photo, location, date, stage, index }) => {
  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(draggableProvided) => (
        <div
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          className={`${
            (stage === 'Hired' && 'border-2 border-green-500') ||
            (stage === 'Rejected' && 'border-2 border-red-500')
          } mx-2 mb-3 flex cursor-pointer space-x-2 rounded-[5px] bg-white px-2 py-3 shadow-md`}
        >
          <div className='mx-2'>
            <Avatar name={name} photo={photo} />
          </div>
          <div className='flex flex-col -space-y-0.5'>
            <p className='text-sm'>Name: {name}</p>
            <p className='text-sm'>Stage: {stage}</p>
            <p className='text-sm'>Location: {location}</p>
            <p className='text-sm'>Date Applied: {date}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
