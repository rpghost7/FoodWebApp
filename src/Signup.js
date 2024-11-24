import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" })

    async function handleSubmit(event) {
        // event.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location })
        })
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert('Enter valid credentials');
        }
    }
    function handleChange(event) {
        // here i have to write the event.target.name in the brackets
        // because we want to make it as a key in the object.
        setCredentials({ ...credentials, [event.target.name]: event.target.value });

    }
    return (
        <>
            <div className='flex flex-row justify-center'>
                <div className='mt-32 bg-violet-700 w-1/4 rounded-3xl'>
                    <div className='text-white pt-8 text-3xl text-center font-austrailia'>Welcome To The Family!</div>
                    <form onSubmit={handleSubmit}>
                        <div className='block p-5'>
                            <label htmlFor="name" className='text-white text-xl'>Name:</label>
                            <input value={credentials.name} onChange={handleChange} className='block w-full border-4 border-solid focus:border-violet-300 focus:outline-none rounded-xl' type="text" id="name" name="name" required />
                        </div>
                        <div className='block p-5'>
                            <label htmlFor="email" className='text-white text-xl'>Email:</label>
                            <input value={credentials.email} onChange={handleChange} className='block w-full border-4 border-solid focus:border-violet-300 focus:outline-none rounded-xl' type="email" id="email" name="email" required />
                        </div>
                        <div className='block p-5'>
                            <label htmlFor="password" className='text-white text-xl'>Password:</label>
                            <input value={credentials.password} onChange={handleChange} className='block w-full border-4 border-solid focus:border-violet-300 focus:outline-none rounded-xl' type="password" id="password" name="password" required />
                        </div>
                        <div className='block p-5'>
                            <label htmlFor="password" className='text-white text-xl'>Location:</label>
                            <input value={credentials.location} onChange={handleChange} className='block w-full border-4 border-solid focus:border-violet-300 focus:outline-none rounded-xl' type="text" id="location" name="location" required />
                        </div>
                        <div className='flex justify-center space-x-3 p-5'>
                            <button className='text-stone-700 text-lg bg-violet-400 p-2 rounded-lg hover:text-stone-800 hover:bg-violet-300 hover:text-xl' type='submit'>Submit</button>
                            <button className='text-stone-700 text-lg bg-violet-400 p-2 rounded-lg hover:text-stone-800 hover:bg-violet-300 hover:text-xl' type='button'><Link to='/log-in'>
                                Already a User?</Link></button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}
