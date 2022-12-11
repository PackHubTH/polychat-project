import {
    Avatar,
    Box,
    Button,
    Center,
    Divider,
    FormControl,
    Heading,
    HStack,
    Icon,
    Input,
    Link,
    MaterialIcons,
    Pressable,
    Text,
    VStack,
} from 'native-base';
import { useProfileStore } from '../../store/ProfileStore';
import IconFe from 'react-native-vector-icons/Feather';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestoreDb } from '../../utils/dbs/FireStore';

const ECContacts = ({ navigation, route }) => {
    const userData = useProfileStore((state) => state.userData);

    const [ecList, setEcList] = useState([]);

    useEffect(() => {
        setEcList([]);
        if (userData.emergencyList.length !== 0) {
            //loop each data
            userData.emergencyList.map(async (id) => {
                const docRef = doc(firestoreDb, 'User', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setEcList((friendList) => [...friendList, docSnap.data()]);
                } else {
                    console.log('No such document!');
                }
            });
        }
    }, [userData.emergencyList]);

    const ECItem = ({ data }) => {
        if (data)
            return (
                <Box w="280px">
                    <HStack space="20px" alignItems="center">
                        <Avatar
                            bg="amber.500"
                            size="md"
                            source={{
                                uri: data.profilePic,
                            }}
                        >
                     MR
                        </Avatar>
                        <Text fontSize="16px">{data.displayName}</Text>
                    </HStack>
                    <Divider mb="20px" mt="20px" />
                </Box>
            );
    };

    return (
        <Center flex={1} justifyContent="flex-start" pt="32px" bg="white">
            {ecList.length !== 0
                ? ecList.map((contact, i) => {
                    return ECItem({ data: contact });
                })
                : null}
            <Button
                bg="#188ffc"
                color="#fff"
                w="124px"
                h="36px"
                rounded="32px"
                leftIcon={<IconFe name="edit-3" color="#fff" size="16px" />}
                onPress={() => navigation.navigate('ECList')}
            >
            Edit
            </Button>
        </Center>
    );
};

export default ECContacts;
