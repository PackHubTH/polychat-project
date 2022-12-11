import {
    Avatar,
    Box,
    Button,
    Center,
    Checkbox,
    HStack,
    Radio,
    ScrollView,
    Text,
} from 'native-base';
import { View, Modal, Pressable, StyleSheet } from 'react-native';
import IconFe from 'react-native-vector-icons/Feather';
import React, { useEffect, useState } from 'react';
import { color } from '../../../Style';
// import { returnAuthContext } from "../../utils/auth/AuthContext";
// import { getUserData } from "../../utils/dbs/AuthDataOperator";
import { useProfileStore } from '../../store/ProfileStore';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestoreDb } from '../../utils/dbs/FireStore';
import { useAssistanceStore } from '../../store/AssistanceStore';

const ECList = ({ navigation }) => {
    const userData = useProfileStore((state) => state.userData);
    const setUserData = useProfileStore((state) => state.setUserData);
    const [selectedFriend, setSelectedFriend] = useState(userData.emergencyList);
    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        setFriendList([]);
        if (userData.friendList.length !== 0) {
            //loop each data
            userData.friendList.map(async (id) => {
                const docRef = doc(firestoreDb, 'User', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFriendList((friendList) => [...friendList, docSnap.data()]);
                } else {
                    console.log('No such document!');
                }
            });
        }
    }, []);

    const onPressDone = async () => {
        try {
            const userRef = doc(firestoreDb, 'User', userData.userId);
            await updateDoc(userRef, {
                emergencyList: selectedFriend,
            });
            await getDoc(userRef).then((doc) => {
                if (doc.exists()) {
                    setUserData(doc.data());
                }
            });
            // resetState("all");
            navigation.navigate('ECContacts');
        } catch (error) {
            console.log('Error updating document: ', error);
        }
    };

    if (friendList.length !== 0)
        return (
            <ScrollView bg={color.white}>
                <Center>
                    <Box w="80%" mt="24px">
                        <HStack alignItems="center" space={4}>
                            <Text fontSize="2xl" fontWeight="bold">
                        Friend's list
                            </Text>
                            <Text color={color.grey} fontSize="sm">
                        Select at least 1
                            </Text>
                        </HStack>
                        <Checkbox.Group
                            defaultValue={selectedFriend}
                            onChange={(e) => setSelectedFriend(e || [])}
                        >
                            {friendList.length !== 0
                                ? friendList.map((item, index) => {
                                    return (
                                        <Checkbox
                                            key={index}
                                            value={item.userId}
                                            my={2}
                                        >
                                            <HStack
                                                w="100%"
                                                alignItems="center"
                                                space={4}
                                                ml="16px"
                                                py="16px"
                                            >
                                                <Avatar
                                                    size="50px"
                                                    marginX="8px"
                                                    source={{
                                                        uri: item.profilePic || null,
                                                    }}
                                                />
                                                <Text fontSize="18px">
                                                    {item.displayName}
                                                </Text>
                                            </HStack>
                                        </Checkbox>
                                    );
                                })
                                : null}
                        </Checkbox.Group>
                    </Box>
                    <Button onPress={() => onPressDone()}>DONE</Button>
                </Center>
            </ScrollView>
        );
};

export default ECList;
