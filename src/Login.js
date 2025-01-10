import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { ReactComponent as EyeOn } from "./eye-svgrepo-com.svg";
import { ReactComponent as EyeOff } from "./eye-off-svgrepo-com.svg";
export default function Login() {
    const [credentials, setCredentials] = useState({  email: "", password: "" });
    const { setUser } = useContext(UserContext); // Use the context
    // here we are borrowing setUser from the usercontext and assigning a value
    // which can be used in other files as well , and this is how we are able to display in
    // the navbar that we are logged in or signed in etc
    const [showPassword,setShowPassword] = useState(true);
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
        // console.log(json);
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
            setUser({name:json.naming,email:json.email});
            localStorage.setItem("authToken",json.authToken);
            console.log(json.authToken);
            
            navigate('/'); // Redirect on successful login
            // this is using the useNavigate hook in react
        }
    }
    function handleChange(event) {
        // here i have to write the event.target.name in the brackets
        // because we want to make it as a key in the object.
        setCredentials({ ...credentials, [event.target.name]: event.target.value });

    }
    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
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
                        <div className='block p-5 relative'>
                            <label htmlFor="password" className='text-white text-xl'>Password:</label>
                            <input value={credentials.password} onChange={handleChange} className='block w-full border-4 border-solid focus:border-violet-300 focus:outline-none rounded-xl' type={showPassword ? 'password':'text'} id="password" name="password" required />
                            {showPassword ?<EyeOff onClick={togglePasswordVisibility} className='w-8 h-8 absolute bottom-5 right-8 cursor-pointer'></EyeOff> :<EyeOn onClick={togglePasswordVisibility} className='w-8 h-8 absolute bottom-5 right-8 cursor-pointer'></EyeOn>}
                        
                        
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

