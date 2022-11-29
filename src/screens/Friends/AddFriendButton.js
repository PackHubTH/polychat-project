import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import { color } from '../../../Style';
import Icon from 'react-native-vector-icons/Octicons';

const AddFriendButton = ({ navigation }) => {
    return (
        <View
            style={styles.container}
            onStartShouldSetResponder={() => {
                navigation.navigate('AddFriend', {});
            }}
        >
            <View style={styles.textBox}>
                <Text fontWeight={600} style={{ color: color.white, padding: 9 }}>
               Add friend
                </Text>
                <Icon name="person-add" size={19} color={color.white} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        marginTop: 15,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 45,
        backgroundColor: color.lightBlue,
    },
    textBox: {
        fontSize: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AddFriendButton;
