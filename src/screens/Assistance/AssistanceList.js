import {
    Avatar,
    Box,
    Button,
    Center,
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
import { doc, getDoc } from 'firebase/firestore';
import { firestoreDb } from '../../utils/dbs/FireStore';
import { useAssistanceStore } from '../../store/AssistanceStore';

const AssistanceList = () => {
    const userData = useProfileStore((state) => state.userData);
    const friendId = useAssistanceStore((state) => state.friendId);
    const setFriendId = useAssistanceStore((state) => state.setFriendId);
    const [friendList, setFriendList] = useState([]);

    console.log('friend data', userData.friendList);

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
    console.log('friendList', friendList);

    return (
        <ScrollView bg={color.white}>
            <Center>
                <Box w="80%" mt="24px">
                    <HStack alignItems="center" space={4}>
                        <Text fontSize="2xl" fontWeight="bold">
                     Friend's list
                        </Text>
                        <Text color={color.grey} fontSize="sm">
                     Maximum at 1
                        </Text>
                    </HStack>
                    <Radio.Group
                        defaultValue={friendId}
                        onChange={(e) => setFriendId(e)}
                    >
                        {friendList.length !== 0
                            ? friendList.map((item, index) => {
                                return (
                                    <Radio key={index} value={item.userId} my={8}>
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
                                                    uri:
                                            item.profilePic ||
                                            'http://placekitten.com/200/300',
                                                }}
                                            />
                                            <Text fontSize="18px">
                                                {item.displayName}
                                            </Text>
                                        </HStack>
                                    </Radio>
                                );
                            })
                            : null}
                    </Radio.Group>
                </Box>
            </Center>
        </ScrollView>
    );
};

export default AssistanceList;
