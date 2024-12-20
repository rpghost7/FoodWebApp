import React, { useContext } from 'react'
import { CartStateData } from './ContextReducer'
import { ReactComponent as RightArrow } from './right-arrow-svgrepo-com.svg';
import { useNavigate } from 'react-router-dom';
export default function AddToCart() {
    const state = useContext(CartStateData);
    let navigate = useNavigate();
    function handleAddingCart(){
      navigate('/order-summary')
    }
  return (
    state.length ?(<>
    <div onClick={handleAddingCart} className='fixed bottom-1 right-4 p-2 w-32 bg-red-500 text-white rounded-md hover:bg-red-700 cursor-pointer'>
        Go to Cart 
          <RightArrow className='w-7 h-7 inline-block m-1'></RightArrow>
      </div>
      <div className='fixed bottom-1 left-4 p-2 w-32 bg-red-500 text-white rounded-md hover:bg-red-700 '>Items Added: {state.length}</div></>
    
      ) : ""
    
  )
}
