import { Avatar, Badge, Button, HStack, Modal, Pressable, Text, VStack } from 'native-base';
import { useState } from 'react';
import { color } from '../../Style';
import { useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestoreDb } from '../utils/dbs/FireStore';
import { useProfileStore } from '../store/ProfileStore';


const AssistantCard = ({ id, a_data }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [friendProfile, setFriendProfile] = useState('');
    const [friendName, setFriendName] = useState('');
    const [data, setData] = useState(a_data);
    const userData = useProfileStore((state) => state.userData);
    // const setUserData = useProfileStore((state) => state.setUserData);
    // console.log('item', item);

    const getFriendData = async () => {
        if (data.length !== 0) {
            const docRef = doc(firestoreDb, 'User', data.friendId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setFriendProfile(docSnap.data().profilePic);
                setFriendName(docSnap.data().displayName);
            // console.log('docsnap', docSnap.id);
            } else {
                console.log('No such document!');
            }
        }
    };

    useEffect(() => {
        setFriendProfile('');
        setFriendName('');
        getFriendData();
    }, []);

    const getDateTime = (dateTime, mode) => {
        // date show on screen
        if (dateTime) {
            let tempDate = new Date(dateTime.seconds * 1000);
            let fDate =
            tempDate.getDate() +
            '/' +
            (tempDate.getMonth() + 1) +
            '/' +
            tempDate.getFullYear();

            // time show on screen
            let hours = tempDate.getHours();
            hours = hours <= 9 ? '0' + hours : hours;

            let fTime =
            hours +
            ':' +
            (tempDate.getMinutes() < 10 ? '0' : '') +
            tempDate.getMinutes();
            if (mode === 'date') {
                return fDate;
            } else if (mode === 'time') {
                return fTime;
            } else {
                return fDate + ' ' + fTime;
            }
        }
    };

    const onPressAccept = async () => {
        try {
            if (id) {
                const docRef = doc(firestoreDb, 'Assistance', id);
                await updateDoc(docRef, {
                    status: 'accepted',
                });
                setData({ ...data, status: 'accepted' });
            }
            setModalVisible(false);
        } catch (error) {
            console.log(error.message);
        }
    };

    const onPressReject = async () => {
        try {
            if (id) {
                const docRef = doc(firestoreDb, 'Assistance', id);
                await updateDoc(docRef, {
                    status: 'rejected',
                });
                setData({ ...data, status: 'rejected' });
            }
            setModalVisible(false);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <Pressable
                onPress={() => setModalVisible(true)}
                border="4px solid black"
            >
                {({ isPressed, isHovered }) => {
                    return (
                        <VStack
                            bg={
                                isPressed
                                    ? '#8E8E8E'
                                    : isHovered
                                        ? '#8E8E8E'
                                        : '#FFFFFF'
                            }
                            style={{
                                transform: [
                                    {
                                        scale: isPressed ? 0.96 : 1,
                                    },
                                ],
                            }}
                            rounded="20px"
                            shadow={3}
                            w="360px"
                            marginTop="30px"
                            p="14px 20px"
                            space={2}
                        >
                            <HStack justifyContent="space-between">
                                <Text fontWeight="medium" fontSize="16px">
                                    {data.topic}
                                </Text>
                                <Badge
                                    rounded="20px"
                                    variant="solid"
                                    w="70px"
                                    h="25px"
                                    colorScheme={
                                        data.status === 'rejected'
                                            ? 'error'
                                            : data.status === 'accepted'
                                                ? 'success'
                                                : null
                                    }
                                >
                                    {data.status}
                                </Badge>
                            </HStack>
                            <HStack alignItems="center">
                                <Text>My assistant:</Text>
                                <Avatar
                                    size="8"
                                    marginX="8px"
                                    source={{
                                        uri:
                                 friendProfile ||
                                 'http://placekitten.com/200/300',
                                    }}
                                />
                                <Text>{friendName}</Text>
                            </HStack>
                            <Text>
                        Date: {data && getDateTime(data.dateTime, 'date')}
                            </Text>
                            <Text>
                        Time: {data && getDateTime(data.dateTime, 'time')}
                            </Text>
                        </VStack>
                    );
                }}
            </Pressable>

            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header borderBottomWidth="0">
                  Request Assistant
                    </Modal.Header>
                    <Modal.Body
                        py="0"
                        paddingBottom={
                            data.status === 'waiting' &&
                     userData.userId === data.friendId
                                ? '0'
                                : '16px'
                        }
                    >
                        <VStack space={2}>
                            <Text>Topic: {data.topic}</Text>
                            <HStack alignItems="center">
                                <Text>My assistant:</Text>
                                <Avatar
                                    size="8"
                                    marginX="8px"
                                    source={{
                                        uri:
                                 friendProfile ||
                                 'http://placekitten.com/200/300',
                                    }}
                                />
                                <Text>{friendName}</Text>
                            </HStack>
                            <Text>Date: {getDateTime(data.dateTime, 'date')}</Text>
                            <Text>Time: {getDateTime(data.dateTime, 'time')}</Text>
                        </VStack>
                    </Modal.Body>
                    {data.status === 'waiting' &&
               userData.userId === data.friendId ? (
                            <Modal.Footer borderTopWidth="0" justifyContent="center">
                                <Button.Group space={4}>
                                    <Button
                                        backgroundColor={color.green}
                                        rounded="20px"
                                        w="45%"
                                        onPress={() => onPressAccept()}
                                    >
                           Accept
                                    </Button>
                                    <Button
                                        backgroundColor={color.red}
                                        rounded="20px"
                                        w="45%"
                                        onPress={() => onPressReject()}
                                    >
                           Reject
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                        ) : null}
                </Modal.Content>
            </Modal>
        </>
    );
};

export default AssistantCard;
