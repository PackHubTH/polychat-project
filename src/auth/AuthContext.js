import React, { useEffect } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import { auth  } from './firebase-auth';


const UserContext = React.createContext()

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = React.useState({});

    useEffect( () => {
        const authState = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
        })

        return () => {
            authState();
        };
    });

    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    return(
        <UserContext.Provider value={{ method: register}}>
            {children}
        </UserContext.Provider>
    )
} 

export const useAuthContext = () => React.useContext(UserContext)