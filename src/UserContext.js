import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null); // `null` means no user is logged in

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

// note that i wrap userContext around everything in the index.js file 
// this is so that any of the files can access the information in this context