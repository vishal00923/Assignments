import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { XMarkIcon } from '@heroicons/react/24/solid';

import { Input } from './Input';

const uuid = uuidv4();

export const Modal = ({ setShowModal, column, data, setData }) => {
  const [fields, setFields] = useState({
    id: uuid,
    name: '',
    stage: column.title,
    photo: `https://randomuser.me/api/portraits/men/${Math.floor(
      Math.random() * 90
    )}.jpg`,
    location: '',
    dateApplied: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setData({
      ...data,
      candidates: {
        ...data.candidates,
        [uuid]: fields,
      },
    });
    setFields({
      id: uuid,
      name: '',
      stage: column.title,
      photo: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 90
      )}.jpg`,
      location: '',
      dateApplied: '',
    });
    setShowModal(false);
  };

  return (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div
        className='fixed inset-0 h-full w-full bg-black opacity-40'
        onClick={() => setShowModal(false)}
      />
      <div className='flex min-h-[100vh] items-center px-4 py-8'>
        <div className='surface:h-[70vh] relative mx-auto h-[60vh] w-full max-w-[512px] rounded-md bg-[#e3edf7] p-4 shadow-lg lg:h-auto'>
          <button
            onClick={() => setShowModal(false)}
            className='absolute top-4 right-5 rounded-full p-2.5 text-center shadow-md transition-all active:scale-125'
          >
            <XMarkIcon className='h-5 w-5' color='black' />
          </button>
          <div className='mt-1'>
            <div className='text-center'>
              <h2 className='text-2xl font-semibold'>New Record</h2>
            </div>
            <div className='md:max-w-auto max-w-[425px] px-2 pt-8'>
              <form onSubmit={handleSubmit} method='POST'>
                <div className='group relative z-0 mb-6 w-full'>
                  <Input
                    handleChange={handleChange}
                    type={'text'}
                    name={'name'}
                    value={fields.name}
                    label={'Candidate Name'}
                  />
                </div>
                <div className='group relative z-0 mb-6 w-full'>
                  <Input
                    handleChange={handleChange}
                    type={'text'}
                    name={'location'}
                    value={fields.location}
                    label={'Location'}
                  />
                </div>
                <div className='group relative z-0 mb-6 w-full'>
                  <Input
                    handleChange={handleChange}
                    type={'date'}
                    name='dateApplied'
                    value={fields.dateApplied}
                    label={'Date Applied'}
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
