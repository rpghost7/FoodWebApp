import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
export default function Login() {
    const [credentials, setCredentials] = useState({  email: "", password: "" });
    const { setUser } = useContext(UserContext); // Use the context
    let navigate = useNavigate();
    async function handleSubmit(event) {
        event.preventDefault();
        const response = await fetch("http://localhost:5000/api/login-user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password })
        })
        const json = await response.json();
        // here the api sends it as a stream and not as a json object interpreted by
        // javascript that is why we need to json it to interpret it again
        console.log(json);
        if (!response.ok) { // Check if the response status is not OK (i.e., 200-299)
            // If there are errors, alert the first error message
            if (json.errors) {
                  // Map over the errors to display a formatted message
            const errorMessages = json.errors.map(error => error.msg).join('\n');
            // here i use join \n because if there are two error messages to be displayed
            // it will be displayed one on top of another and not separated by a comma
            alert(errorMessages); // Show all error messages
            } else {
                alert('An unknown error occurred.'); // Fallback for unknown errors
            }
        } else if (json.success) {
            setUser({name:json.naming});
            navigate('/'); // Redirect on successful login
            // this is using the useNavigate hook in react
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
                    <div className='text-white pt-8 text-3xl text-center font-austrailia'>Welcome Back!</div>
                    <form onSubmit={handleSubmit}>
                       
                        <div className='block p-5'>
                            <label htmlFor="email" className='text-white text-xl'>Email:</label>
                            <input value={credentials.email} onChange={handleChange} className='block w-full border-4 border-solid focus:border-violet-300 focus:outline-none rounded-xl' type="email" id="email" name="email" required />
                        </div>
                        <div className='block p-5'>
                            <label htmlFor="password" className='text-white text-xl'>Password:</label>
                            <input value={credentials.password} onChange={handleChange} className='block w-full border-4 border-solid focus:border-violet-300 focus:outline-none rounded-xl' type="password" id="password" name="password" required />
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
