import { firebaseApp } from '../auth/firebase-app'
import { getFirestore } from 'firebase/firestore'

export const firestoreDb = getFirestore(firebaseApp);