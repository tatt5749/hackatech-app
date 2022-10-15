import React, {useMemo, useReducer, useContext,useState, createContext} from 'react';
import authInitialState from './initialStates/authState';
import homeInitialState from './initialStates/homeState';
import auth from './reducers/auth';
import home from './reducers/home';

export const GlobalContext = createContext({});


const GlobalProvider = ({children}) => {
    const [authState, authDispatch] = useReducer(auth, authInitialState);
    const [homeState, homeDispatch] = useReducer(home,homeInitialState);

    return (
        <GlobalContext.Provider
            value={{
                authState, authDispatch,
                homeState,homeDispatch,
            }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;