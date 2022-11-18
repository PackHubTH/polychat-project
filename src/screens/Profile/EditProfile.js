import { Avatar, Box, Button, Center, FormControl, Heading, HStack, Icon, Input, Link, MaterialIcons, Modal, Pressable, Text, VStack } from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import { useEditProfileStore } from '../../store/EditProfileStore';
import { useAuthContext } from "../../utils/auth/AuthContext";

const EditProfile = ({ navigation, route }) => {

  const name = useEditProfileStore(state => state.name);
  const status = useEditProfileStore(state => state.status);
  const showModal = useEditProfileStore(state => state.showModal);
  const setName = useEditProfileStore(state => state.setName);
  const setStatus = useEditProfileStore(state => state.setStatus);
  const setShowModal = useEditProfileStore(state => state.setShowModal);

  const { user } = useAuthContext();
  console.log('user', user);

  const handleBack = () => {
    console.log('name: ', name, ', status: ', status);
    setShowModal(true);
  };

  const FormInput = ({ label, placeholder, value, onChangeText }) => {
    return (
      <FormControl mb="16px" w="286px">
        <FormControl.Label
          _text={{
            color: "#1f2937",
            fontWeight: "bold"
          }}
          mb="15px"
        >
          {label}
        </FormControl.Label>
        <Input
          h="42px"
          variant="rounded"
          onChangeText={onChangeText}
          placeholder={placeholder}
          value={value}
        />
      </FormControl>
    );
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {/* <Text>This is {route.params.name}'s profile</Text> */}
      <Center bg="#fff" flex={1}>
        <Avatar bg="amber.500" size="xl" mb="40px" source={{
          uri: "https://bit.ly/broken-link"
        }}>
          MR
        </Avatar>
        {FormInput({ label: "Display name", placeholder: "John Doe", value: name, onChangeText: (e) => setName(e) })}
        {FormInput({ label: "Status", placeholder: "Hi, I'm John", value: status, onChangeText: (e) => setStatus(e) })}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} _backdrop={{
          _dark: {
            bg: "coolGray.800"
          },
          bg: "warmGray.50"
        }}>
          <Modal.Content maxWidth="350" maxH="212">
            <Modal.Header>Discard changes?</Modal.Header>
            <Modal.Body>
              You have unsaved changes, are you sure you want to discard them?
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                  setShowModal(false);
                  navigation.goBack();
                }}>
                  Discard
                </Button>
                <Button onPress={() => {
                  setShowModal(false);
                }}>
                  Keep Editing
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  }
});

export default EditProfile;