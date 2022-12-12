import { Box, Button, Center, HStack, ScrollView, Text } from 'native-base';
import IconFe from 'react-native-vector-icons/Feather';
import { color } from '../../../Style';
import AssistantCard from '../../components/AssistantCard';
import { useProfileStore } from '../../store/ProfileStore';
import { useEffect } from 'react';
import { collection, query, orderBy, where, getDocs } from 'firebase/firestore';
import { firestoreDb } from '../../utils/dbs/FireStore';
import { useState } from 'react';

const AssistanceScreen = ({ navigation, route }) => {
    const userData = useProfileStore((state) => state.userData);
    const [assistanceData, setAssistanceData] = useState([]);
    const [isDefault, setIsDefault] = useState(true);

    const renderCard = async () => {
        try {
            const docRef = collection(firestoreDb, 'Assistance');
            const q = query(
                docRef,
                where('userId', '==', userData.userId),
                orderBy('dateTime')
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
                setAssistanceData((prev) => [...prev, [doc.data(), doc.id]]);
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        setAssistanceData([]);
        renderCard();
    }, [userData]);

    console.log('assist render');
    if (assistanceData.length !== 0) {
        return (
        //  <ScrollView bg={color.white} flex={1}>
            <Center bg="white" w="100%" flex={1}>
                <HStack space={4}>
                    <Button
                        variant={isDefault ? 'solid' : 'outline'}
                        onPress={() => setIsDefault(true)}
                    >
                  My Assistance
                    </Button>
                    <Button
                        variant={!isDefault ? 'solid' : 'outline'}
                        onPress={() => setIsDefault(false)}
                    >
                  Friend's Assistance
                    </Button>
                </HStack>
                {/* <Box h="90%" px="32px"> */}
                <ScrollView>
                    {assistanceData
                        .filter((data) => {
                            if (!isDefault) {
                                return userData.userId === data[0].friendId;
                            } else {
                                return !(userData.userId === data[0].friendId);
                            }
                        })
                        .map((data, i) => {
                            return (
                                <AssistantCard key={i} a_data={data[0]} id={data[1]} />
                            );
                        })}
                </ScrollView>
                {/* </Box> */}
                {/* {renderCard()} */}
            </Center>
        //  </ScrollView>
        );
    } else {
        return (
            <Center flex={1} bg="#fff">
                <IconFe name="x-circle" size="50px" color={color.grey} />
                <Text color={color.grey} fontSize="16px">
               You haven't created any appointments.
                </Text>
            </Center>
        );
    }
};

export default AssistanceScreen;
