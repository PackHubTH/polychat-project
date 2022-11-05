import { 
    useState, useEffect, 
    useContext, createContext
} from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';

import { auth  } from './FirebaseAuth';
import { createRegisterData } from '../dbs/AuthDataOperator';

const UserContext = createContext()

export const AuthContextProvider = ({children}) => {
    
    const register = (email, password) => {
        const user = createUserWithEmailAndPassword(auth, email, password).then( () => signOut(auth) )
        return user;
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    const [user, setUser] = useState({});
    useEffect( () => {
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
        <UserContext.Provider value={{ register, user, logout, login }}>
            {children}
        </UserContext.Provider>
    )
} 

export const useAuthContext = () => useContext(UserContext)

export const returnAuthContext = () => {
    return useContext(UserContext);
}