import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import { color } from '../../../../Style';
import Receive from '../layouts/Receive';

export default function YouMessage({ message }) {
    return (
        <Receive>
            <View style={styles.absolute}>
                <Text fontWeight={400} style={styles.message}>
                    {message}
                </Text>
            </View>
        </Receive>
    );
}

const styles = StyleSheet.create({
    absolute: {
        marginTop: 12,
        minHeight: 32,
        padding: 10,
        maxWidth: '48%',
        backgroundColor: color.lightBlue,
        borderRadius: '8%',
    },
    message: { color: color.white },
});
