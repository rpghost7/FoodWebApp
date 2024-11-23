import React from 'react'

export default function Login() {
  return (
    <>
    <div className='flex flex-row justify-center'>
        <div className='mt-32 bg-violet-700 w-1/4 rounded-3xl'>
            <div className='text-white pt-8 text-3xl text-center font-austrailia'>Welcome back!</div>
            <form>
               
                <div className='block p-5'>
                    <label for="email" className='text-white text-xl'>Email:</label>
                    <input className='block w-full border-4 border-solid focus:border-violet-300 focus:outline-none rounded-xl' type="email" id="email" name="email" required />
                </div>
                <div className='block p-5'>
                    <label for="password" className='text-white text-xl'>Password:</label>
                    <input className='block w-full border-4 border-solid focus:border-violet-300 focus:outline-none rounded-xl' type="password" id="password" name="password" required />
                </div>
                <div className='flex justify-center space-x-3 p-5'>
                    <button className='text-stone-700 text-lg bg-violet-400 p-2 rounded-lg hover:text-stone-800 hover:bg-violet-300 hover:text-xl' type='submit'>Submit</button>
                    
                </div>
            </form>
        </div>
    </div>
</>
  )
}
