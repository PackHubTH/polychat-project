import { firebaseApp, firebaseConfig } from '../auth/FirebaseApp';
import { 
    getFirestore, doc, setDoc,
    updateDoc
} from 'firebase/firestore';

export const firestoreDb = getFirestore(firebaseApp);


export const addData = async (collec, pathRef, struct) => {
    const docRef = doc(firestoreDb, collec, pathRef);
    try {
        await setDoc(docRef, struct);
    } catch (error) {
        throw new Error(`Failed to add data to ${docRef.path}`);
    }
};

export const updateData = async (collec, pathRef, struct) => {
    const docRef = doc(firestoreDb, collec, pathRef);
    try {
        await updateDoc(docRef, struct);
    } catch (error) {
        throw new Error(`Failed to update data to ${docRef.path}`);
    }
};

export const deleteData = async (collec, pathRef) => {
    const docRef = doc(firestoreDb, collec, pathRef);
    try {
        await deleteDoc(docRef);
    } catch (error) {
        throw new Error(`Failed to update data to ${docRef.path}`);
    }
};