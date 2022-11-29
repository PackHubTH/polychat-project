import { Avatar, Box, Button, Center, FormControl, Heading, HStack, Icon, Input, Link, MaterialIcons, Modal, Pressable, Text, VStack } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dimensions, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useAuthContext } from '../../utils/auth/AuthContext';
import { color } from '../../../Style';

import { useEditProfileStore } from '../../store/EditProfileStore';
import { useProfileStore } from '../../store/ProfileStore';


const EditProfile = ({ navigation, route }) => {

    const displayName = useProfileStore(state => state.userData.displayName);
    const profilePic = useProfileStore(state => state.userData.profilePic);
    const status = useProfileStore(state => state.userData.status);
    const tempDisplayName = useProfileStore(state => state.tempDisplayName);
    const tempStatus = useProfileStore(state => state.tempStatus);
    const setDisplayName = useProfileStore(state => state.setDisplayName);
    const setStatus = useProfileStore(state => state.setStatus);
    const setTempDisplayName = useProfileStore(state => state.setTempDisplayName);
    const setTempStatus = useProfileStore(state => state.setTempStatus);

    const showModal = useEditProfileStore(state => state.showModal);
    const setShowModal = useEditProfileStore(state => state.setShowModal);

    useEffect(() => {
        setTempDisplayName(displayName);
        setTempStatus(status);
    }, []);

    const FormInput = ({ label, value, onChangeText }) => {
        return (
            <FormControl mb="16px" w="286px">
                <FormControl.Label
                    _text={{
                        color: color.black,
                        fontWeight: 'bold'
                    }}
                    mb="15px"
                >
                    {label}
                </FormControl.Label>
                <Input
                    color={color.grey}
                    h="42px"
                    variant="rounded"
                    onChangeText={onChangeText}
                    // placeholder={placeholder}
                    value={value}
                />
            </FormControl>
        );
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <Center bg="#fff" flex={1}>
                <Avatar bg="amber.500" size="xl" mb="40px" source={{
                    uri: profilePic
                }}
                />

                {FormInput({ label: 'Display name', value: displayName, onChangeText: (e) => setDisplayName(e) })}
                {FormInput({ label: 'Status', value: status, onChangeText: (e) => setStatus(e) })}
            </Center>

            <Modal shadow="9" isOpen={showModal} onClose={() => setShowModal(false)} _backdrop={{
                _dark: {
                    bg: 'coolGray.800'
                },
                bg: '#1e1e1e'
            }}>
                <Modal.Content bg="#fff" maxWidth="350" maxH="212" borderRadius="20px" p={2}>
                    <Modal.Header bg="#fff" borderBottomWidth="0">Discard changes?</Modal.Header>
                    <Modal.Body bg="#fff" py="0">
            You have unsaved changes, are you sure you want to discard them?
                    </Modal.Body>
                    <Modal.Footer bg="#fff" borderTopWidth="0" justifyContent="center">
                        <Button.Group space={2}>
                            <Button bg={color.grey} borderRadius="20px" w="100px"
                                onPress={() => {
                                    setShowModal(false);
                                    setDisplayName(tempDisplayName);
                                    setStatus(tempStatus);
                                    navigation.goBack();
                                }}>
                Discard
                            </Button>
                            <Button bg={color.lightBlue} borderRadius="20px"
                                onPress={() => {
                                    setShowModal(false);
                                }}>
                Keep Editing
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </KeyboardAwareScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
    }
});

export default EditProfile;