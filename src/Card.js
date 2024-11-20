import React from 'react'
import chicken from './Chicken-Biryani-Recipe.jpg'
export default function Card() {
  return (
    <>
    <div className='flex flex-row h-auto w-full mt-32 px-12 pb-10 '>
        <div className='w-full h-full bg-violet-600'>
            <img className='w-full object-fill' src={chicken} alt='chickenBiryani'/>
            <p className='text-white text-2xl'>Card title</p>
            <p className='text-white'>Card description</p>
            <select className='bg-gray-400'>
            {Array.from({ length: 9 }, (_, index) => {
              return (
                <option className='hover:bg-gray-200' key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              );
            })}
            </select>
        </div>
        <div className='w-full h-full mx-36'>
            <img className='w-full object-fill' src={chicken} alt='chickenBiryani'/>
            <p className='text-white text-2xl'>Card title</p>
            <p className='text-white'>Card description</p>
            <select>
            {Array.from({ length: 9 }, (_, index) => {
              return (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              );
            })}
            </select>
        </div>
        <div className='w-full h-full mr-36'>
            <img className='w-full object-fill' src={chicken} alt='chickenBiryani'/>
            <p className='text-white text-2xl'>Card title</p>
            <p className='text-white '>Card description</p>
            <select>
            {Array.from({ length: 9 }, (_, index) => {
              return (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              );
            })}
            </select>
        </div>
        <div className='w-full h-full'>
            <img className='w-full object-fill' src={chicken} alt='chickenBiryani'/>
            <p className='text-white text-2xl'>Card title</p>
            <p className='text-white'>Card description</p>
            <select>
            {Array.from({ length: 9 }, (_, index) => {
              return (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              );
            })}
            </select>
        </div>
    </div>
    </>
  )
}
