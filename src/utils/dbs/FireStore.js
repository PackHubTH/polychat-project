import { firebaseApp, firebaseConfig } from '../auth/FirebaseApp'
import { getFirestore } from 'firebase/firestore'

export const firestoreDb = getFirestore(firebaseApp);
