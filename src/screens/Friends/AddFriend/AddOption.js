import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { color } from '../../../../Style';
import { Text } from 'native-base';

const AddOption = () => {
    const [option, setOption] = useState('PHONE');

    return (
        <View style={styles.container}>
            <View style={[styles.menu, styles.border]}>
                <Text fontSize={14} fontWeight={500}>
               User ID
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 46,
        backgroundColor: color.white,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    menu: {
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    border: {
        borderBottomColor: color.grey,
        borderBottomWidth: 2,
        marginBottom: 30,
    },
});

export default AddOption;
