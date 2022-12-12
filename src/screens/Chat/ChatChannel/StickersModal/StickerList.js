import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'native-base';
import CreateMessage from '../../../../utils/create/CreateMessage';
import GenerateUid from '../../../../utils/generate/GenerateUid';

import {
    collection,
    addDoc,
    serverTimestamp,
    doc,
    setDoc,
} from 'firebase/firestore';

import { firestoreDb } from '../../../../utils/dbs/FireStore';
import { useAuthContext } from '../../../../utils/auth/AuthContext';

const StickerList = ({ userChat, stickers, friendData }) => {
    const { user } = useAuthContext();

    // update the chat channel document
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
    // send sticker
    const sendSticker = async (message) => {
        await addDoc(collection(firestoreDb, 'Message'), {
            ...message,
        });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.stickerList}>
                {stickers.map((url, i) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                const timestamp = serverTimestamp();
                                const messageId = GenerateUid();
                                const newMessage = CreateMessage(
                                    user.uid,
                                    friendData.userId,
                                    '',
                                    '',
                                    timestamp,
                                    messageId,
                                    url.toString()
                                );
                                sendSticker(newMessage);
                                updateChatChannelDoc(newMessage.messageId);
                            }}
                            style={styles.item}
                            key={i}
                        >
                            <Image
                                source={{
                                    uri: url,
                                }}
                                alt="Sticker"
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
