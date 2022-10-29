import React from 'react';

import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "firebase/auth";
import { firebaseApp } from "../auth/firebase-app"

export const auth = getAuth(firebaseApp);

// const userSession = () => {
//     const [user, setUser] = React.useState({});

//     onAuthStateChanged(auth, (currentuser) => {
//         setUser(currentuser);
//     })
// }

// export const login = async (loginEmail,loginPassword) => {
//     try {
//         user = await signInWithEmailAndPassword(
//         auth,
//         loginEmail,
//         loginPassword
//       );
//     } catch(error) {
//       console.log(error.message);
//       throw new Error(`Login failed`);
//     }
// }

// export const register = async (regEmail,regPassword) => {
//     try {
//         user = await createUserWithEmailAndPassword(
//         auth, regEmail, regPassword
//         );
//         console.log(user);
//     } catch(error) {
//         console.log(error.message);
//         throw new Error(`Cannot create account`);
//     }
// }

// export const logout = async () => {
//     try {
//         await signOut(auth);
//         console.log("Logout success");
//     } catch(error) {
//         console.log(error);
//         throw new Error(`Can't logout`);
//     }
// }

// export default userSession;