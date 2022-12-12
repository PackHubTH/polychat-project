import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuthContext } from '../../utils/auth/AuthContext';
import { firestoreDb } from '../../utils/dbs/FireStore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getUserData } from '../../utils/dbs/AuthDataOperator';
import { color } from '../../../Style';
import FriendWithChat from './FriendWithChat';

const ChatScreen = ({ navigation }) => {
    const { user } = useAuthContext();
    const [userChat, setUserChat] = useState([]);

    // get all user's chat from db
    const getAllUserChat = async (userId) => {
        const chats = [];

        const collectionRef = collection(firestoreDb, 'ChatChannel');
        try {
            // query for all chat channel that user is in, where user is user2, and listen for any changes
            let query1 = query(collectionRef, where('user1', '==', userId));
            const querySnap1 = await getDocs(query1);
            querySnap1.forEach((doc) => {
                chats.push({ ...doc.data(), id: doc.id });
            });

            // query for all chat channel that user is in, where user is user2, and listen for any changes
            let query2 = query(collectionRef, where('user2', '==', userId));
            const querySnap2 = await getDocs(query2);
            querySnap2.forEach((doc) => {
                chats.push({ ...doc.data(), id: doc.id });
            });

            // set state collecting user's chat data for futher use
            if (chats.length !== 0) {
                setUserChat(chats);
            } else {
                console.log(`GetAllUserChat: No chat found for ${userId}`);
                return [];
            }
        } catch (error) {
            console.log(error.message);
            throw new Error(
                `GetAllUserChat: Failed to get user's chat for ${userId}`
            );
        }
    };

    useEffect(() => {
        getUserData(user.uid).then((userData) => {
            setUserChat(userData.chatList);

            if (user.uid === userChat.user1) {
                getUserData(userChat.user2).then((friend) => {
                    setFriendData(friend);
                });
            } else {
                getUserData(userChat.user1).then((friend) => {
                    setFriendData(friend);
                });
            }
        });
        getAllUserChat(user.uid);
    }, []);
    return (
        <View style={styles.page}>
            {/* render friend list on chat page */}
            {userChat.map((e, i) => {
                return <FriendWithChat userChat={e} navigation={navigation} key={i} />;
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    page: { height: '100%', backgroundColor: color.white },
});

export default ChatScreen;
