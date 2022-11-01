import React from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';

import { auth  } from './FirebaseAuth';
import { createRegisterData } from '../dbs/AuthDb';

const UserContext = React.createContext()

export const AuthContextProvider = ({children}) => {
    
    const register = (email, password) => {
        const user = createUserWithEmailAndPassword(auth, email, password);
        logout();
        return user;
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    const [user, setUser] = React.useState({});
    React.useEffect( () => {
        const authState = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            if(currentUser != null) console.log(`Current User: ${currentUser.email}`)
            else console.log("No user");
            setUser(currentUser);
        })

        return () => {
            authState();
        };
    });
    
    return(
        <UserContext.Provider value={{ method: register, user, logout, login}}>
            {children}
        </UserContext.Provider>
    )
} 

export const useAuthContext = () => React.useContext(UserContext)

export const returnAuthContext = () => {
    return React.useContext(UserContext);
}