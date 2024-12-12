import React, { useState } from 'react';
import chicken from './Chicken-Biryani-Recipe.jpg';
import { ReactComponent as StarIcon } from './Star.svg';


export default function Card() {
  const [rating, setRating] = useState(0);
  const percentage = Math.round((4 / 5) * 100);
  // still trying to figure out a way to give custom rating according to the products
  function handleRating() {
    setRating(4);
  }

  return (
    <div className='mt-32 px-12 pb-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16'>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className='w-full h-full rounded-md'>
            <div className='bg-violet-600 rounded-md hover:w-11/12 hover:h-11/12'>
              <img className='w-full object-fill rounded-md' src={chicken} alt='chickenBiryani' />
              <p className='text-white text-2xl p-2'>Card title</p>
              <p className='text-white p-2 inline-flex relative'>
                Rating: {handleRating}
                {Array.from(Array(5).keys()).map((_, i) => (
                  <StarIcon key={i} className="mr-0.5 w-5 h-5 flex z-10 translate-y-0.5" style={{ color: '#ff8f00' }} />
                ))}
                <div className="bg-violet-600 absolute top-0 bottom-0 right-0 mix-blend-color z-20" style={{ width: `${100 - percentage}%` }} />
              </p>
              
             
              {/* <CustomDropdown></CustomDropdown> */}
             
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// https://samuelkraft.com/blog/fractional-svg-stars-css
// the above link was used to create the star rating system and it's css
// thanks to that it is working
// also use gap when making space between rows and columns while doing it in a grid
// or flex box