import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Center } from 'native-base';
import Friend from '../../components/Friend';
import { mock_friendsRequest } from './data';
import GenerateUid from '../../utils/GenerateUid';
import Icon from 'react-native-vector-icons/Feather';
import { color } from '../../../Style';
import RemoveItemArray from '../../utils/RemoveItemArray';

import {
    collection,
    doc,
    getDoc,
    addDoc,
    setDoc,
    query,
    where,
    deleteDoc,
    updateDoc,
    arrayUnion,
    onSnapshot,
    collectionGroup,
    getDocs,
} from 'firebase/firestore';

import { firestoreDb } from '../../utils/dbs/FireStore';
import { useAuthContext } from '../../utils/auth/AuthContext';

const FriendRequest = (props) => {
    const { user } = useAuthContext();
    const [friendRequests, setFriendRequests] = useState(props.friends);
    console.log('props.friends', props.friends);
    useEffect(() => {}, [friendRequests]);
    //if there is no user in the friend request, setState to null
    const nullCondition = (array) => {
        if (array.length === 0) {
            setFriendRequests(null);
        } else {
            setFriendRequests([...array]);
        }
    };

    const createChatChannel = async (user1, user2) => {
        const newChannel = {
            channelId: GenerateUid(),
            user1: user1,
            user2: user2,
            readStatus: false,
            messageId: [],
        };

        await addDoc(collection(firestoreDb, 'ChatChannel'), newChannel);
    };

    const acceptFriendHandler = async (getin) => {
        // create chat channel

        try {
            console.log('createing chat channel');
            await addDoc(collection(firestoreDb, 'ChatChannel'), {
                channelId: GenerateUid(),
                user1: user.uid,
                user2: getin.userId,
                readStatus: false,
                messageId: [],
            });
        } catch (error) {
            console.log('error', error);
            console.log('create chatchannel error');
        }

        // ui
        // setFriendRequests((previous) => [...previous, getin]);
        const array = RemoveItemArray(friendRequests, getin);
        props.setRequestDoc(array);
        nullCondition(array);

        // db
        const ref = doc(firestoreDb, 'User', user.uid);
        await updateDoc(ref, {
            friendList: arrayUnion(getin.userId),
        });

        const ref2 = doc(firestoreDb, 'User', getin.userId);
        await updateDoc(ref2, {
            friendList: arrayUnion(user.uid),
        });

        console.log('props.requestDoc', props.requestDoc);
        console.log('props.requestDoc2', props.requestDoc[0].id);
        props.requestDoc.map((e) => {
            if (e.receiver === user.uid && e.sender === getin.userId) {
                const docRef = doc(firestoreDb, 'FriendRequest', e.id);

                console.log('incondition');
                deleteDoc(docRef).then(() => {
                    console.log('Document successfully deleted!');
                });
            }
        });
    };
    const rejectFriendHandler = (user) => {
        console.log('rejectFriendHandler');
        const array = RemoveItemArray(friendRequests, user);
        setFriendRequests([...array]);
        nullCondition(array);
    };

    // show this component when friend request not null
    if (friendRequests !== null) {
        return (
            <View style={style.component}>
                <View style={style.wrap}>
                    <Text fontSize="lg" fontWeight={600}>
                  Friend request
                    </Text>

                    <View style={style.content}>
                        {props.friends.map((e, i) => {
                            return (
                                <View key={i} style={style.friendRequest}>
                                    <Friend friend={e} gap={0} width={'70%'} />
                                    <Center style={style.command}>
                                        <Icon
                                            //accept friend and update
                                            onPress={() => {
                                                acceptFriendHandler(e);
                                            }}
                                            name="check-circle"
                                            size={18}
                                            color={color.green}
                                            style={{ paddingRight: 12 }}
                                        />
                                        <Icon
                                            //reject friend
                                            onPress={() => {
                                                rejectFriendHandler(e);
                                            }}
                                            name="x-circle"
                                            size={18}
                                            color={color.red}
                                        />
                                    </Center>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </View>
        );
    }
    // hide this component when friend request is null
    else {
        return null;
    }
};

const style = StyleSheet.create({
    component: {
        // flexWrap: 1,
        backgroundColor: '#ffff',
        // alignSelf: 'stretch',
        borderRadius: 15,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        overflow: 'scroll',
        marginTop: 20,

        // shadow
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    wrap: {
        width: '88%',
    },
    content: {
        alignSelf: 'stretch',
        flexWrap: 1,
        width: '100%',
    },
    friendRequest: {
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: 10,
        height: 50,
        flexDirection: 'row',
    },
    command: {
        paddingLeft: '15%',
        height: '100%',
        width: '30%',
        alignItems: 'center',
        flexDirection: 'row',
    },
});

export default FriendRequest;
