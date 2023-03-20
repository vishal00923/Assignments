import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { Card } from './Card';
import { Modal } from './Modal';

export const Stage = ({ column, candidates, isRightBorder, data, setData }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className='flex w-full flex-col'>
        <div
          className={`${
            isRightBorder && 'border-r-2 border-[#a4a4a4ac]'
          } bg-white py-1 text-center`}
        >
          <p className='font-semibold text-[#79b4f4]'>{column.title}</p>
        </div>
        <Droppable droppableId={column.id}>
          {(droppableProvided) => (
            <div
              className='mt-5'
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {candidates.map((candidate, index) => (
                <Draggable
                  key={candidate.id}
                  draggableId={`${candidate.id}`}
                  index={index}
                >
                  {(draggableProvided) => (
                    <div
                      key={candidate.id}
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <Card
                        name={candidate.name}
                        photo={candidate.photo}
                        location={candidate.location}
                        stageName={column.title}
                        dateApplied={candidate.dateApplied}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
        <div className='my-2 text-center'>
          <button
            onClick={handleClick}
            className='rounded-full p-2.5 text-center shadow-md transition-all active:scale-125'
          >
            <PlusIcon className='h-5 w-5' color='#1372d8' />
          </button>
        </div>
      </div>

      {showModal ? (
        <Modal
          data={data}
          column={column}
          setData={setData}
          setShowModal={setShowModal}
        />
      ) : null}
    </>
  );
};
