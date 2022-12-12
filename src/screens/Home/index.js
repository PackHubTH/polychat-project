import { Center, Text } from 'native-base';
import IconFe from 'react-native-vector-icons/Feather';

const SOS = () => {
    return (
        <Center flex={1} bg="#fff">
            <IconFe name="check-circle" size="50px" />
            <Text fontSize="16px" mt="16px">
            We have notified your friends.
            </Text>
            <Text fontSize="16px">Please wait for help from your friends.</Text>
        </Center>
    );
};

export default SOS;
