import {
    collection,
    doc,
    getDoc,
    setDoc,
    getDocs,
    query,
    where,
} from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

import { firestoreDb } from './FireStore';

export const createRegisterData = async (
    user,
    email,
    phoneNum,
    userId,
    displayName,
    firstname,
    lastname
) => {
    try {
        await updateProfile(user, {
            displayName: displayName,
            phoneNumber: phoneNum,
        });
        console.log('Register: Updated auth profile');
    } catch (error) {
        console.log(error.message);
        throw new Error(
            `Register: Failed to update auth profile for ${user.email}`
        );
    }

    try {
        await setDoc(doc(firestoreDb, 'User', userId), {
            about: '',
            userId: userId,
            firstname: firstname,
            phoneNumber: phoneNum,
            lastname: lastname,
            displayName: displayName,
            email: email,
            profilePic: '',
            assistantList: [],
            chatList: [],
            emergencyList: [],
            friendList: [],
            friendRequest: [],
        });
        console.log('Register: Updated profile document in Firestore');
    } catch (error) {
        console.log(error.message);
        throw new Error(
            'Register: Failed to upload profile document to Firestore'
        );
    }
};

export const getUserData = async (userId) => {
    try {
        const user = await getDoc(doc(firestoreDb, 'User', userId));

        if (user.exists()) {
            console.log(`GetUserData: ${userId};
                displayName: ${user.data()?.displayName},
                firstname: ${user.data()?.firstname},
                lastname: ${user.data()?.lastname},
                email: ${user.data()?.email},
                phoneNumber: ${user.data()?.phoneNumber},
                status: ${user.data()?.status},
            `);
            return user.data();
        } else {
            console.log(`GetUserData: ${userId} have no data`);
        }
    } catch (error) {
        console.log(error.message);
        throw new Error(`GetUserData: Failed to get data for ${userId}`);
    }
};

export const getUserChat = async (channelId) => {
    try {
        const chat = await getDoc(
            doc(firestoreDb, 'ChatChannel', channelId.toString())
        );
        console.log('chat');
        console.log(chat.data());
        if (chat.exists()) {
            console.log(chat.data());
            return chat.data();
        } else {
            console.log(`GetUserChat: ${channelId} have no data`);
        }
    } catch (error) {
        console.log(error.message);
        throw new Error(`GetUserChat: Failed to get data for ${channelId}`);
    }
};

export const getAllUserChat = async (userId) => {
    const user = await getDoc(doc(firestoreDb, 'User', userId));
    if (user.exists()) {
        const chats = [];
        const collectionRef = collection(firestoreDb, 'ChatChannel');
        try {
            let query1 = query(collectionRef, where('user1', '==', userId));
            const querySnap1 = await getDocs(query1);
            querySnap1.forEach((doc) => {
                chats.push(doc.data());
            });

            let query2 = query(collectionRef, where('user2', '==', userId));
            const querySnap2 = await getDocs(query2);
            querySnap2.forEach((doc) => {
                chats.push(doc.data());
            });

            return chats;
        } catch (error) {
            console.log(error.message);
            throw new Error(
                `GetAllUserChat: Failed to get user's chat for ${userId}`
            );
        }
    } else {
        return null;
    }
};
