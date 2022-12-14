import { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useAuthContext } from '../../../utils/auth/AuthContext';
import { firestoreDb } from '../../../utils/dbs/FireStore';
import { onSnapshot, collection } from 'firebase/firestore';
import YouMessage from './YouMessage';
import MeMessage from './MeMessage';
import InputBox from './InputBox';
import MapMessage from './MapMessage';
import StickersModal from './StickersModal/StickersModal';
import Send from '../layouts/Send';
import Receive from '../layouts/Receive';
import PhotoMessage from './PhotoMessage';
import { HStack } from 'native-base';

import { useChatChannelStore } from '../../../store/ChatChannelStore';
import TimeChat from '../../../components/TimeChat';

export default function ChatChannel({ navigation, route }) {
    const { user } = useAuthContext();
    const [channelMessages, setChannelMessages] = useState([]);
    const [showSticker, setShowsticker] = useState(false);

    const setFriendData = useChatChannelStore((state) => state.setFriendData);
    const setUserChat = useChatChannelStore((state) => state.setUserChat);

    useEffect(() => {
        setFriendData(route.params.friendData);
        setUserChat(route.params.userChat);
    }, []);

    const renderMessageDb = (messageObject, i) => {
        // check if messageObject has timestamp or not
        if (messageObject.timestamp === null)
            messageObject.timestamp = { seconds: new Date().getTime() * 1000 };

        // check messageObject that it's a chat messageor not
        if (messageObject.photo === '' && messageObject.location === '') {
            if (messageObject.sender === user.uid) {
                return (
                    <MeMessage
                        key={i}
                        message={messageObject.text}
                        time={messageObject.timestamp.seconds * 1000}
                    />
                );
            }
            return (
                <YouMessage
                    key={i}
                    message={messageObject.text}
                    time={messageObject.timestamp.seconds * 1000}
                />
            );
        }
        // if it's not a chat message
        else {
            // return location photo assistance or emergency here
            if (messageObject.location !== '') {
                return (
                    <MapMessage
                        key={i}
                        location={messageObject.location}
                        navigation={navigation}
                        isSender={messageObject.sender === user.uid}
                        time={messageObject.timestamp.seconds * 1000}
                    />
                );
            }
            // return photo message here
            if (messageObject.sender === user.uid) {
                return (
                    <Send>
                        <HStack alignItems="flex-end" space={2}>
                            <TimeChat
                                time={new Date(messageObject.timestamp.seconds * 1000)}
                            />
                            <PhotoMessage key={i} photo={messageObject.photo} />
                        </HStack>
                    </Send>
                );
            }
            return (
                <Receive>
                    <HStack alignItems="flex-end" space={2}>
                        <PhotoMessage key={i} photo={messageObject.photo} />
                        <TimeChat
                            time={new Date(messageObject.timestamp.seconds * 1000)}
                        />
                    </HStack>
                </Receive>
            );
        }
    };

    // sort message by timestamp
    const sortMessage = (messageArray) => {
        let sortedArray = [];
        if (messageArray.length != undefined || messageArray.length != 0) {
            sortedArray = messageArray.sort((a, b) => a.timestamp - b.timestamp);
        }
        return sortedArray;
    };

    // filter message by sender and receiver
    const filterMessage = async (messageArray, uid1, uid2) => {
        let filtered = [];
        messageArray.map((e) => {
            if (e.sender == uid1 && e.receiver == uid2) {
                filtered.push(e);
            } else if (e.sender == uid2 && e.receiver == uid1) {
                filtered.push(e);
            }
        });
        return filtered;
    };

    // get all message from db
    const getAllMessages = async (userId) => {
        try {
            // listening for any changes in message collection
            const unsub = onSnapshot(
                collection(firestoreDb, 'Message'),
                (snapShot) => {
                    let messages = [];
                    snapShot.docs.forEach((doc) => {
                        messages.push(doc.data());
                    });
                    filterMessage(
                        messages,
                        user.uid,
                        route.params.friendData.userId
                    ).then((filtered) => {
                        setChannelMessages([...sortMessage(filtered)]);
                    });
                },
                (error) => {
                    console.log(error.message);
                }
            );
            // check if there is any chat
            if (channelMessages.length === 0) {
                console.log(`getAllMessages: No chat found for ${userId}`);
                return [];
            }
        } catch (error) {
            console.log(error.message);
            throw new Error(
                `getAllMessages: Failed to get user's chat for ${userId}`
            );
        }
    };
    useEffect(() => {
        getAllMessages(user.uid);
    }, []);
    return (
        <View style={styles.page}>
            <StickersModal
                friendData={route.params.friendData}
                userChat={route.params.userChat}
                showSticker={showSticker}
                setShowsticker={setShowsticker}
            />
            <ScrollView style={styles.content}>
                {channelMessages.map((e, i) => {
                    return renderMessageDb(e, i);
                })}
            </ScrollView>
            <InputBox
                showSticker={showSticker}
                setShowsticker={setShowsticker}
                setChannelMessages={setChannelMessages}
                friendData={route.params.friendData}
                userChat={route.params.userChat}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '88%',
        height: '100%',
        overflow: 'scroll',
        flexDirection: 'column',
    },
});
