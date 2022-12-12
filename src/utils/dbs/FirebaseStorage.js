import { firebaseApp, firebaseConfig } from '../auth/FirebaseApp';
import { getStorage, ref } from 'firebase/storage';

export const firebaseStorage = getStorage(firebaseApp, firebaseConfig.storageBucket);