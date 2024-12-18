import { createContext, useReducer } from "react";

export const CartStateData = createContext();
export const CartDispatchData = createContext();
const reducer = (state, action) => {
    switch(action.type){
    case "ADD" : 
    return [...state,{id:action.id,name:action.name}]
    default :
    console.log('Error in reducer')
    }
    
};
export const Cart = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  // here reducer is the kind of action which useReducer needs to perform with each dispatch
 
  return (
    <CartDispatchData.Provider value={dispatch}>
      <CartStateData.Provider value={state}>{children}</CartStateData.Provider>
    </CartDispatchData.Provider>
  );
};
