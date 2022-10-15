import React, {useMemo, useReducer, useContext,useState, createContext} from 'react';
import authInitialState from './initialStates/authState';
import homeInitialState from './initialStates/homeState';
import walletInitialState from './initialStates/walletState';
import auth from './reducers/auth';
import home from './reducers/home';
import wallet from './reducers/wallet';

export const GlobalContext = createContext({});


const GlobalProvider = ({children}) => {
    const [authState, authDispatch] = useReducer(auth, authInitialState);
    const [homeState, homeDispatch] = useReducer(home,homeInitialState);
    const [walletState, walletDispatch] = useReducer(wallet,walletInitialState);

    return (
        <GlobalContext.Provider
            value={{
                authState, authDispatch,
                homeState,homeDispatch,
                walletState,walletDispatch,
            }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;