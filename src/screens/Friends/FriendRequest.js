import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Center } from 'native-base';
import Friend from '../../components/Friend';
import GenerateUid from '../../utils/generate/GenerateUid';
import Icon from 'react-native-vector-icons/Feather';
import { color } from '../../../Style';
import RemoveItemArray from '../../utils/RemoveItemArray';
import searchUserById from '../../utils/User/SearchUser.js';

import {
    collection,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    arrayUnion,
    deleteDoc,
    getDocs,
} from 'firebase/firestore';

import { firestoreDb } from '../../utils/dbs/FireStore';
import { useAuthContext } from '../../utils/auth/AuthContext';

const FriendRequest = (setDbFriends) => {
    const { user } = useAuthContext();

    const [requestDoc, setRequestDoc] = useState([]);
    const [friendRequest, setFriendRequest] = useState([]);

    // search friend request
    const searchFriendsRequest = async () => {
        const request = [];
        const querySnapshot = await getDocs(
            collection(firestoreDb, 'FriendRequest')
        );
        querySnapshot.forEach((doc) => {
            if (doc.data().receiver == user.uid) {
                request.push({ ...doc.data(), id: doc.id });

                setRequestDoc((prev) => {
                    return [...prev, { ...doc.data(), id: doc.id }];
                });
            }
        });

        // what is below code doing?
        if (request.length > 0) {
            request.map(async (item) => {
                const docRef = doc(firestoreDb, 'User', item.sender);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setFriendRequest((prev) => {
                        return [...prev, docSnap.data()];
                    });
                } else {
                    console.log('No such document for' + item.sender);
                }
            });
        }
    };

    useEffect(() => {
        searchFriendsRequest();
    }, []);

    //if there is no user in the friend request, setState to null
    const nullCondition = (array) => {
        if (array.length === 0) {
            setFriendRequest(null);
        } else {
            setFriendRequest([...array]);
        }
    };
    // accept friend request
    const acceptFriendHandler = async (getin) => {
        // create chat channel
        try {
            await addDoc(collection(firestoreDb, 'ChatChannel'), {
                channelId: GenerateUid(),
                user1: user.uid,
                user2: getin.userId,
                readStatus: false,
                messageId: [],
            });
        } catch (error) {
            console.log('create chatchannel error', error);
        }

        // db
        const ref = doc(firestoreDb, 'User', user.uid);
        await updateDoc(ref, {
            friendList: arrayUnion(getin.userId),
        }).then(() => {
            console.log(`update friendlist success for ${user.uid}`);
        });
        const ref2 = doc(firestoreDb, 'User', getin.userId);
        await updateDoc(ref2, {
            friendList: arrayUnion(user.uid),
        }).then(() => {
            console.log(`update friendlist success for ${getin.userId}`);
        });
        searchUserById(getin.userId).then((user) => {
            setDbFriends((prev) => {
                return [...prev, user];
            });
        });

        // update ui
        const array = RemoveItemArray(friendRequest, getin);
        setFriendRequest([...array]);

        // remove friend request
        requestDoc.map((e) => {
            if (e.receiver === user.uid && e.sender === getin.userId) {
                const docRef = doc(firestoreDb, 'FriendRequest', e.id);

                deleteDoc(docRef).then(() => {
                    console.log('Document successfully deleted!');
                });
            }
        });

        nullCondition(array);
    };

    // reject friend request
    const rejectFriendHandler = (getin) => {
        // update ui
        const array = RemoveItemArray(friendRequest, getin);
        setFriendRequest([...array]);

        // remove friend request
        requestDoc.map((e) => {
            if (e.receiver === user.uid && e.sender === getin.userId) {
                const docRef = doc(firestoreDb, 'FriendRequest', e.id);

                deleteDoc(docRef).then(() => {
                    console.log('Document successfully deleted!');
                });
            }
        });
        nullCondition(array);
    };

    if (friendRequest !== null && friendRequest.length > 0) {
        return (
            <View style={style.component}>
                <View style={style.wrap}>
                    <Text fontSize="lg" fontWeight={600}>
                  Friend request
                    </Text>

                    <View style={style.content}>
                        {friendRequest.map((e, i) => {
                            return (
                                <View key={i} style={style.friendRequest}>
                                    <Friend friend={e} gap={0} width={'70%'} />
                                    <Center style={style.command}>
                                        <Icon
                                            //accept friend
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
        backgroundColor: '#ffff',
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
