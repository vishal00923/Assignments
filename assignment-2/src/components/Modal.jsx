import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import { useInputState } from '@/hooks/useInputState';
import { XMarkIcon } from '@heroicons/react/24/solid';

import Input from './Input';

const Modal = ({ addRecord, closeModal, columnData }) => {
  const [name, handleChangeName] = useInputState('');
  const [date, handleChangeDate] = useInputState('');
  const [location, handleChangeLocation] = useInputState('');

  const idCol = columnData;
  const randomrUrl = `https://randomuser.me/api/portraits/men/${Math.floor(
    Math.random() * 80
  )}.jpg`;

  const newRecord = {
    id: uuidv4,
    name: name,
    idCol: idCol,
    date: date,
    photo: randomrUrl,
    location: location,
  };

  const handleForm = (e) => {
    e.preventDefault();
    addRecord(newRecord);
  };

  return (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div
        className='fixed inset-0 h-full w-full bg-black opacity-40'
        onClick={closeModal}
      />
      <div className='flex min-h-[100vh] items-center px-4 py-8'>
        <div className='surface:h-[70vh] relative mx-auto h-[60vh] w-full max-w-[512px] rounded-md bg-[#e3edf7] p-4 shadow-lg lg:h-auto'>
          <button
            onClick={closeModal}
            className='absolute top-4 right-5 rounded-full p-2.5 text-center shadow-md transition-all active:scale-125'
          >
            <XMarkIcon className='h-5 w-5' color='black' />
          </button>
          <div className='mt-1'>
            <div className='text-center'>
              <h2 className='text-2xl font-semibold'>New Record</h2>
            </div>
            <div className='md:max-w-auto max-w-[425px] px-2 pt-8'>
              <form onSubmit={handleForm} method='POST'>
                <div className='group relative z-0 mb-6 w-full'>
                  <Input
                    handleChange={handleChangeName}
                    type='text'
                    name='name'
                    value={name}
                    label='Candidate Name'
                  />
                </div>
                <div className='group relative z-0 mb-6 w-full'>
                  <Input
                    handleChange={handleChangeLocation}
                    type='text'
                    name='location'
                    value={location}
                    label='Location'
                  />
                </div>
                <div className='group relative z-0 mb-6 w-full'>
                  <Input
                    handleChange={handleChangeDate}
                    type='date'
                    name='dateApplied'
                    value={date}
                    label='Date Applied'
                  />
                </div>

                <div className='text-center'>
                  <button className='rounded-[5px] bg-[#79b4f4] px-4 py-2 text-sm text-white shadow-md transition-all active:scale-105'>
                    Add Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
