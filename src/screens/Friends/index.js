import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import FriendList from './FriendList';
import { contentLayout } from '../../../Style';
import FriendRequest from './FriendRequest';
import { useState } from 'react';
import { mock_friends } from './data';
import { Text } from 'native-base';
import { useAuthContext } from '../../utils/auth/AuthContext';

import {
    collection,
    doc,
    getDoc,
    addDoc,
    setDoc,
    query,
    where,
    onSnapshot,
    collectionGroup,
    getDocs,
} from 'firebase/firestore';

import { firestoreDb } from '../../utils/dbs/FireStore';

const style = StyleSheet.create({
    page: {
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    content: {
        width: contentLayout.width,
        overflow: 'scroll',
    },
});

const FriendsScreen = ({ navigation }) => {
    const [friendRequest, setFriendRequest] = useState([]);
    const [dbFriends, setDbFriends] = useState([]);
    const [requestDoc, setRequestDoc] = useState([]);

    const { user } = useAuthContext();
    const [yourUser, setYourUser] = useState(null);

    const searchUser = async () => {
        const docRef = doc(firestoreDb, 'User', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setYourUser(docSnap.data());
            return docSnap.data();
        } else {
            console.log('No such document!');
        }
    };

    const searchFriends = async (arrayId) => {
        if (arrayId.length > 0) {
            arrayId.map(async (id) => {
                const docRef = doc(firestoreDb, 'User', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setDbFriends((prev) => {
                        return [...prev, docSnap.data()];
                    });
                } else {
                    console.log('No such document for' + id);
                }
            });
        }
    };

    // const searchFriendsReq = async (arrayId) => {
    //    console.log('searchFriendsReq555', arrayId);
    //    if (arrayId.length > 0) {
    //       arrayId.map(async (id) => {
    //          const docRef = doc(firestoreDb, 'FriendRequest', id);
    //          const docSnap = await getDoc(docRef);

    //          if (docSnap.exists()) {
    //             setDbFriendRequest((prev) => {
    //                return [...prev, docSnap.data()];
    //             });
    //          } else {
    //             console.log('No such document for' + id);
    //          }
    //       });
    //    }
    // };

    const searchFriendsReq2 = async () => {
        const request = [];
        const querySnapshot = await getDocs(
            collection(firestoreDb, 'FriendRequest')
        );
        querySnapshot.forEach((doc) => {
            if (doc.data().receiver == user.uid) {
                request.push({ ...doc.data(), id: doc.id });
            }
        });

        setRequestDoc(request);

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
        searchUser().then((e) => {
            searchFriendsReq2();
            searchFriends(e.friendList);
        });
    }, []);
    if (dbFriends.length !== 0) {
        return (
            <View style={style.page}>
                <View style={style.content}>
                    <FriendRequest
                        requestDoc={requestDoc}
                        setRequestDoc={setRequestDoc}
                        friends={friendRequest}
                    />
                    <FriendList friends={dbFriends} navigation={navigation} />
                </View>
            </View>
        );
    } else {
        return (
            <View style={style.page}>
                <View style={style.content}>
                    <FriendRequest friends={friendRequest} />
                    <FriendList friends={dbFriends} navigation={navigation} />
                    <Text>...</Text>
                </View>
            </View>
        );
    }
};

export default FriendsScreen;
