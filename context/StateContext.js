import React, { createContext, useContext, useState, useEffect } from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {
    //js here

return (
    <Context.Provider
    value={{
        //your variables here
    }}
    >
    {children}
    </Context.Provider>
    )
}

export const userStateContext = () => useContext(Context);