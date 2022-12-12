import { View, StyleSheet } from 'react-native';
import { HStack, Text } from 'native-base';
import { color } from '../../../../Style';
import Send from '../layouts/Send';
import TimeChat from '../../../components/TimeChat';

export default function MeMessage({ message, time }) {
    return (
        <Send>
            <HStack alignItems="flex-end" space={2}>
                <TimeChat time={new Date(time)} />
                <View style={styles.absolute}>
                    <Text fontWeight={400} style={styles.message}>
                        {message}
                    </Text>
                </View>
            </HStack>
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
