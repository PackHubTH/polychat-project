import React, { useState } from 'react';
import { View, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { Text } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { contentLayout, color } from '../../../../Style';
import {
    collection,
    doc,
    getDoc,
    addDoc,
    setDoc,
    getDocs,
    query,
    where,
    onSnapshot,
} from 'firebase/firestore';

import { firestoreDb } from '../../../utils/dbs/FireStore';

const SearchUser = ({ navigation }) => {
    const [searchUser, setSearchUser] = useState(null);
    const [search, setSearch] = useState(null);

    const searchUserById = async () => {
        const docRef = doc(firestoreDb, 'User', search);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            navigation.navigate('SearchedFriend', {
                searchUser: docSnap.data(),
            });
        } else {
            setSearchUser('');
            console.log('No such document!');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                <Text fontSize={14} fontWeight={500}>
               Input user ID
                </Text>
            </View>
            <View style={styles.search}>
                <View style={[styles.inputBox, { paddingRight: 10 }]}>
                    <TextInput
                        style={styles.input}
                        onChange={(e) => {
                            setSearch(e.nativeEvent.text);
                        }}
                    />
                </View>
                <Icon
                    name="search1"
                    size="25px"
                    onPress={() => {
                        searchUserById();
                    }}
                />
            </View>
            {searchUser === '' ? (
                <View>
                    <Text>User not found</Text>
                </View>
            ) : null}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 35,
        width: contentLayout.width,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    title: {
        width: '100%',
    },
    search: {
        paddingTop: 3,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        width: '100%',
    },
    input: {
        height: 40,
        margin: 12,
        width: '90%',
        borderRadius: 20,
        borderWidth: 1,
        padding: 10,
        color: color.grey,
    },
});

export default SearchUser;
