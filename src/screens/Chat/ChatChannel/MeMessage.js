import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import { color } from '../../../../Style';
import Send from '../layouts/Send';

export default function MeMessage({ message }) {
    return (
        <Send>
            <View style={styles.absolute}>
                <Text fontWeight={400} style={styles.message}>
                    {message}
                </Text>
            </View>
        </Send>
    );
}

const styles = StyleSheet.create({
    absolute: {
        marginTop: 12,
        minHeight: 32,
        padding: 10,
        maxWidth: '48%',
        backgroundColor: color.white,
        borderRadius: '8%',
    },
    message: { color: color.black },
});
