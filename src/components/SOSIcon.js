import * as Location from 'expo-location';
import { TouchableWithoutFeedback } from 'react-native';
import { Button } from 'native-base';
import { firestoreDb } from '../utils/dbs/FireStore';
import GenerateUid from '../utils/generate/GenerateUid';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import CreateMessage from '../utils/create/CreateMessage';
import { useProfileStore } from '../store/ProfileStore';

const SOSIcon = (navigation) => {
    const userData = useProfileStore((state) => state.userData);

    const sendChat = async (message) => {
        await addDoc(collection(firestoreDb, 'Message'), {
            ...message,
        });
    };

    const getLocation = async () => {
        let errorMsg = null;

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            errorMsg = 'Permission to access location was denied';
            return;
        }

        let location = await Location.getCurrentPositionAsync({});

        let text = '';
        if (errorMsg) {
            text = errorMsg;
        } else if (location) {
            text = JSON.stringify(location);
        }

        let address = await Location.reverseGeocodeAsync(location.coords);

        let ans = {
            address:
            address[0].name +
            ', ' +
            address[0].city +
            ', ' +
            address[0].region +
            ', ' +
            address[0].country +
            ', ' +
            address[0].postalCode,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };
        return ans;
    };

    return (
        <TouchableWithoutFeedback>
            <Button
                variant="solid"
                style={{
                    border: '4px solid white',
                    borderRadius: '100%',
                    backgroundColor: '#eb3434',
                    width: 56,
                    height: 56,
                    bottom: 20,
                }}
                onLongPress={async () => {
                    console.log('SOSEMER', userData);

                    if (userData.emergencyList.length === 0) {
                        alert('No emergency contact');
                    } else {
                        userData.emergencyList.map(async (contact, i) => {
                            console.log('Contact Number:', i, contact);
                            const timestamp = serverTimestamp();
                            const messageId = GenerateUid();
                            const textMessage = CreateMessage(
                                userData.userId,
                                contact,
                                'I\'m in the emergency situation. Please contact me as soon as possible.',
                                '',
                                timestamp,
                                messageId,
                                ''
                            );
                            sendChat(textMessage);

                            const timestamp2 = serverTimestamp();
                            const messageId2 = GenerateUid();
                            const location = await getLocation();
                            const locationMessage = CreateMessage(
                                userData.userId,
                                contact,
                                '',
                                location,
                                timestamp2,
                                messageId2,
                                ''
                            );
                            sendChat(locationMessage);
                            navigation.navigate('SOS');
                        });
                    }
                }}
                delayLongPress={2000}
            >
            SOS
            </Button>
        </TouchableWithoutFeedback>
    );
};

export default SOSIcon;
