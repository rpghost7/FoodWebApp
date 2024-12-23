import React, { createContext, useState } from "react";


export const AuthToken = createContext();

export default function Token({ children }) {
  const [CartValue,setCartValue] = useState(null);

  return <AuthToken.Provider value={{CartValue,setCartValue}}>{children}</AuthToken.Provider>;
}

// i initially made a mistake of thinking that i may have to send the auth token to the frontend from the backend for sending order requests to paypal . but it turns out that the auth token is not required for sending order requests to paypal. so i just kept the name as it is a hassle to change it back and i am sending cart value in it 