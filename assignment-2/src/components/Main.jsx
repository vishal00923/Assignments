import React from 'react';

import { Stage } from './Stage';

export const Main = ({ data, setData }) => {
  return (
    <div className='flex flex-col items-center'>
      <div className='my-4'>
        <h2 className='text-center text-2xl font-semibold'>Stages</h2>
      </div>
      <div className='flex w-[90%] border-t-2 border-[#79b4f4]'>
        {data.columnOrder.map((columnId, idx) => {
          const column = data.columns[columnId];
          const candidates = column.candidateIds.map(
            (candidateId) => data.candidates[candidateId]
          );
          if (idx === data.columnOrder.length - 1) {
            return (
              <Stage
                key={idx}
                data={data}
                column={column}
                setData={setData}
                candidates={candidates}
                isRightBorder={false}
              />
            );
          }
          return (
            <Stage
              key={idx}
              data={data}
              column={column}
              setData={setData}
              candidates={candidates}
              isRightBorder={true}
            />
          );
        })}
      </div>
    </div>
  );
};
