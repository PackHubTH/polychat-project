import { firestoreDb } from '../dbs/FireStore';
import { doc, getDoc } from 'firebase/firestore';

const searchUserById = async (userId) => {
    const docRef = doc(firestoreDb, 'User', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
};

export default searchUserById;
