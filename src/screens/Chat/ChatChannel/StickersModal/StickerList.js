import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'native-base';
import CreateMessage from '../../../../utils/CreateMessage';
import GenerateUid from '../../../../utils/GenerateUid';

import {
    collection,
    addDoc,
    FieldValue,
    serverTimestamp,
    doc,
    setDoc,
    updateDoc,
    arrayUnion,
    where,
} from 'firebase/firestore';

import { firestoreDb } from '../../../../utils/dbs/FireStore';
import { useAuthContext } from '../../../../utils/auth/AuthContext';

const StickerList = (props) => {
    const { user } = useAuthContext();

    const updateChatChannelDoc = async (newMessageId) => {
        try {
            await setDoc(doc(firestoreDb, 'ChatChannel', userChat.id), {
                ...userChat,
                messageId: [...userChat.messageId, newMessageId],
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const sendSticker = async (message) => {
        await addDoc(collection(firestoreDb, 'Message'), {
            ...message,
        });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.stickerList}>
                {props.stickers.map((url, i) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                const newMessage = {
                                    sender: user.uid,
                                    receiver: props.friendData.userId,
                                    text: '',
                                    location: '',
                                    photo: url.toString(),
                                    timestamp: serverTimestamp(),
                                    messageId: GenerateUid(),
                                };
                                console.log(newMessage);
                                sendSticker(newMessage);
                                updateChatChannelDoc(newMessage.id);
                            }}
                            style={styles.item}
                            key={i}
                        >
                            <Image
                                source={{
                                    uri: url,
                                }}
                                size="md"
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 260,
    },
    stickerList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    item: {
        padding: 10,
    },
});

export default StickerList;
