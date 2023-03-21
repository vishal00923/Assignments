import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { initialData } from '@/data';

import Modal from './Modal';
import Column from './Column';

const Board = () => {
  const [modal, setModal] = useState(false);
  const [columns, setColumns] = useState(
    JSON.parse(window.localStorage.getItem('columns')) || initialData
  );

  const onDragEnd = (result) => {
    const { destination, source } = result;

    // if the user try to drop in an unknown destination
    if (!destination) {
      console.log('No Destination');
      return;
    }

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log('Source and Destination are the same');
      return;
    }

    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    if (start === end) {
      const newCandidateIds = Array.from(start.candidateIds);

      const swapCandidate = newCandidateIds[source.index];
      newCandidateIds.splice(source.index, 1);
      newCandidateIds.splice(destination.index, 0, swapCandidate);

      const newColumnsState = columns.map((col) => {
        if (col.id === start.id) {
          col.candidateIds = newCandidateIds;
          return col;
        } else {
          return col;
        }
      });
      setColumns([...newColumnsState]);
      return;
    }

    const startCandidateIds = Array.from(start.candidateIds);
    const [item] = startCandidateIds.splice(source.index, 1);

    const endCandidateIds = Array.from(end.candidateIds);
    endCandidateIds.splice(destination.index, 0, item);

    const newColumnsState = columns.map((col) => {
      if (col.id === start.id) {
        col.candidateIds = startCandidateIds;
        return col;
      } else if (col.id === end.id) {
        col.candidateIds = endCandidateIds;
        return col;
      } else {
        return col;
      }
    });
    setColumns([...newColumnsState]);
  };

  const openModal = (data) => {
    const columnId = data.id;
    setModal(columnId);
  };

  const closeModal = () => {
    setModal(false);
  };

  const addRecord = (newRecord) => {
    setModal(false);
    const updatedColumns = columns.map((column) => {
      if (column.id === newRecord.idCol) {
        column.candidateIds.push(newRecord);
        return column;
      } else {
        return column;
      }
    });

    setColumns([...updatedColumns]);
  };

  useEffect(() => {
    window.localStorage.setItem('columns', JSON.stringify(columns));
  }, [columns]);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {modal && (
          <Modal
            closeModal={closeModal}
            addRecord={addRecord}
            columnData={modal}
          />
        )}
        <div className='flex flex-col items-center'>
          <div className='my-4'>
            <h2 className='text-center text-2xl font-semibold'>Stages</h2>
          </div>
          <div className='flex w-[90%] border-t-2 border-[#79b4f4]'>
            {columns.map((col) => (
              <Column key={col.name} columnData={col} openModal={openModal} />
            ))}
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default Board;
