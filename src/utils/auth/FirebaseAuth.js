import React from 'react';

import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "firebase/auth";
import { firebaseApp } from "./FirebaseApp"

export const auth = getAuth(firebaseApp);