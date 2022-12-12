import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import AddOption from './AddOption';
import SearchUser from './SearchUser';
import { color } from '../../../../Style';

const AddFriend = ({ navigation }) => {
    return (
        <View style={styles.page}>
            <AddOption />
            <SearchUser navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    page: { height: '100%', backgroundColor: color.white },
});

export default AddFriend;
