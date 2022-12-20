import  React,{ createContext, useContext, useEffect, useState } from 'react';
import auth from '../utils/auth';
import { CURRENT_USER } from'../utils/queries';


const StateContext = createContext(null);
export const StateContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState([]);
    useEffect(() => {
        const user = auth.getToken;
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
    }, []);
    return (React.createElement(StateContext.Provider, { value: CURRENT_USER }, children));
};
export const useStateContext = () => useContext(StateContext);