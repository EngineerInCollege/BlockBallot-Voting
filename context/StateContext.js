import React, { createContext, useContext, useState, useEffect } from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {

return (
    <Context.Provider
    value={{
    }}
    >
    {children}
    </Context.Provider>
    )
}

export const userStateContext = () => useContext(Context);