import React from 'react'
import { Link, Outlet } from 'react-router-dom'


export default function Navbar() {
    return (
        <>
            <div className='bg-violet-600 flex flex-row justify-between'>

                <div className='flex flex-row'>
                    <div className=' relative text-white text-4xl m-4 font-permanent-marker text-emerald-400'>
                        <Link to="/home">
                            StayHungri</Link></div>
                    <div className=' relative text-white text-xl m-7 hover:text-violet-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-purple-300 after:transition-all after:ease-in-out after:duration-300 hover:after:w-full '>
                        <Link to="/home">
                            Home</Link></div>
                    <div className=' relative text-white text-xl m-7 hover:text-violet-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-purple-300 after:transition-all after:ease-in-out after:duration-300 hover:after:w-full '>
                        <Link to="/contact">
                            Contact</Link></div>
                </div>


                <div className=' relative text-white text-xl m-7 hover:text-violet-300 '>
                    <Link to="/sign-up">
                        Sign Up</Link>
                </div>

            </div>
            <Outlet />

        </>
    )
}


// below is the css code to create a custom underline

// .button::after {
//   content: '';
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   width: 0%;
//   height: 2px;
//   background-color: red;
//   transition: width 0.3s;
// }

// .button:hover::after {
//   width: 100%;
// }
