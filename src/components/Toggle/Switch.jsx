import React from 'react'

import { useReducer, createContext } from 'react'


export const myContext = createContext();
const initialState = {darkMode: false};
    const reducer = (state, action) => {
        switch(action.type) {
            case "toggle":
                return {darkMode: !state.darkMode};
            default:
                return state;
        }

    }
const Switch = (props) => {
    

    const [state, dispatch] = useReducer(reducer,initialState);

  return (
    <myContext.Provider value={{ state, dispatch}}>{props.children}</myContext.Provider>
  )
}

export default Switch