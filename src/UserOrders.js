
import React, { useContext, useEffect } from 'react'
import { UserContext } from './UserContext';
export default function UserOrders() {
    const [data,setData]= useState({});
    const {user} = useContext(UserContext);
     useEffect(() => {
       const fetchData = async () => {
         try {
           const response = await fetch("http://localhost:5000/api/myOrders", {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({email: user.email })
           });
           const data = await response.json();
           console.log(data);
           setData(data);
         } catch (error) {
           console.error("Error fetching cards:", error);
         }
       };
   
       fetchData();
     }, []);


  return (
    <div className='text-white text-lg'>
      this is my orders
    </div>
  )
}



