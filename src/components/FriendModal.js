import React from 'react';
import { Alert, Modal, StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconIo from 'react-native-vector-icons/Ionicons';
import IconSl from 'react-native-vector-icons/SimpleLineIcons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'native-base';
import { color } from '../../Style';

const FriendModal = ({ modalVisible, setModalVisible, friend }) => {
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.top}>
                            <View
                                onStartShouldSetResponder={() => {
                                    setModalVisible(false);
                                }}
                            >
                                <IconAnt name="close" size={25} color={color.black} />
                            </View>
                        </View>
                        <View style={styles.middle}>
                            <Image
                                size={100}
                                borderRadius={100}
                                source={{
                                    uri:
                              friend.profilePic == ''
                                  ? 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'
                                  : friend.profilePic,
                                }}
                                alt="Friend's photo"
                            />
                            <Text style={{ marginTop: 25 }}>{friend.firstname}</Text>

                            <Text style={{ marginTop: 10 }}>{friend.userId}</Text>
                        </View>
                        <View style={styles.bottom}>
                            <View style={styles.iconBox}>
                                <IconIo
                                    name="chatbubble-outline"
                                    size={28}
                                    color={color.black}
                                />
                                <Text style={{ marginTop: 1 }}>chat</Text>
                            </View>
                            <View style={[styles.iconBox, { marginLeft: 50 }]}>
                                <IconMc
                                    name="account-heart-outline"
                                    size={28}
                                    color={color.black}
                                />
                                <Text style={{ marginTop: 1 }}>assistant</Text>
                            </View>
                            <View style={[styles.iconBox, { marginLeft: 50 }]}>
                                <IconSl name="notebook" size={28} color={color.black} />
                                <Text style={{ marginTop: 1 }}>emerg</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: '80%',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',

        //shadow
        alignItems: 'center',
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    top: {
        width: '100%',
        position: 'absoulte',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        top: 10,
        right: 15,
    },
    middle: {
        width: '100%',
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        marginTop: 25,
        paddingBottom: 20,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBox: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FriendModal;
