import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function VerifyOTP() {
    const [otp, setOtp] = useState("");
    const { state } = useLocation(); // Get credentials passed from signup page
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    async function handleVerify(event) {
        event.preventDefault();
        const credentials = state.credentials;

        // Verify the OTP
        const response = await fetch("http://localhost:5000/api/verify-otp", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phoneNumber:"<Send your phone number>", otp:otp })
        });

        const result = await response.json();
        if (result.success) {
            // Create the user after OTP is verified
            const userResponse = await fetch("http://localhost:5000/api/createuser", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password,location:credentials.location})
            });

            const userResult = await userResponse.json();
        
        if (userResult.success) {
                setUser({ name: userResult.naming,email:userResult.email })
                navigate('/');
            }
        } else {
            alert(result.message || "Invalid OTP. Please try again.");
        }
    }

  return (
   <>
    <div className='flex flex-row justify-center'>
            <div className='mt-32 bg-violet-700 w-1/4 rounded-3xl'>
                <div className='text-white pt-8 text-3xl text-center font-austrailia'>Verify OTP</div>
                <form onSubmit={handleVerify}>
                    <div className='block p-5'>
                        <label htmlFor="otp" className='text-white text-xl'>Enter OTP:</label>
                        <input value={otp} onChange={(e) => setOtp(e.target.value)} className='block w-full border-4 border-solid focus:border-violet-300 focus:outline-none rounded-xl' type="text" id="otp" name="otp" required />
                    </div>
                    <div className='flex justify-center space-x-3 p-5'>
                        <button className='text-stone-700 text-lg bg-violet-400 p-2 rounded-lg hover:text-stone-800 hover:bg-violet-300 hover:text-xl' type='submit'>Verify</button>
                    </div>
                </form>
            </div>
        </div>
   
   </>
  )
}
