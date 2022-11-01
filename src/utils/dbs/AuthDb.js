import { 
    ref, uploadBytesResumable,
    getDownloadURL
 } from 'firebase/storage';
import {
    collection, doc,
    getDoc, addDoc, setDoc
} from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

import  { firebaseStorage } from './FirebaseStorage';
import { firestoreDb } from './FireStore';


export const createRegisterData = ( user ,email, userId, userName, picture) => {

    const registerStorageRef = ref(firebaseStorage, userId);
    const uploadTask = uploadBytesResumable(registerStorageRef, picture)

    //Upload to Storage
    uploadTask.on(
        (error) => {
          //Upload Error Handling
            console.log(error);
            throw new Error(`Upload Files Failed`);
        },
        () => {
            //Success Uploading
            getDownloadURL(uploadTask.snapshot.ref)
                .then( async (downloadURL) => {

                    try {

                        //Update Auth Profile
                        await updateProfile( user, {
                                displayName: userName,
                                photoURL: downloadURL
                            }
                        );
                        console.log(`Files: ${downloadURL}`)
    
                        //Update Firestore
                        await setDoc( 
                            doc(firestoreDb, "users", userId), {
                                userId: userId,
                                displayName: userName,
                                email: email,
                                profilePic: downloadURL
                            }
                        );
                        
                    } catch (e) {
                        console.log(e);
                        throw new Error(`Updating Firebase Failed`);
                    }
                    
                    
                });
                    
            }
    );


};