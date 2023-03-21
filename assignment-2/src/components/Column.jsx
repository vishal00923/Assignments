import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { PlusIcon } from '@heroicons/react/24/solid';

import Card from './Card';

const Column = ({ columnData, openModal }) => {
  return (
    <div className='flex w-full flex-col'>
      <div className={`bg-white py-1 text-center`}>
        <p className='font-semibold text-[#79b4f4]'>{columnData.name}</p>
      </div>
      <Droppable droppableId={`${columnData.id - 1}`}>
        {(droppableProvided) => (
          <div
            className='mt-5'
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {columnData.candidateIds.map((candidate, index) => (
              <Card
                key={candidate.id}
                id={candidate.id}
                index={index}
                name={candidate.name}
                date={candidate.date}
                photo={candidate.photo}
                stage={columnData.name}
                location={candidate.location}
              />
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
      <div className='my-2 text-center'>
        <button
          onClick={() => openModal(columnData)}
          className='rounded-full p-2.5 text-center shadow-md transition-all active:scale-125'
        >
          <PlusIcon className='h-5 w-5' color='#1372d8' />
        </button>
      </div>
    </div>
  );
};

export default Column;
