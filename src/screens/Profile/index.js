import { Avatar, Box, Button, Center, Flex, FormControl, Heading, HStack, Icon, Input, Link, MaterialIcons, Pressable, Text, VStack } from "native-base";

import IconFe from 'react-native-vector-icons/Feather';

const Profile = ({ navigation, route }) => {

  const ProfileButton = ({ text, icon, onPress }) => {
    return (
      <Pressable onPress={() => navigation.navigate(onPress)} >
        {({
          isHovered,
          isFocused,
          isPressed
        }) => {
          return <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "white"} style={{
            transform: [{
              scale: isPressed ? 0.96 : 1
            }]
          }} rounded="20" shadow={3} marginTop="10px" marginBottom="10px"
          >
            <HStack w="300" h="60" p="6" justifyContent="space-between" alignItems="center">
              <HStack alignItems="center" space={4}>
                <IconFe name={icon} color="#1f2937" size="20px" />
                <Text color="#1f2937">{text}</Text>
              </HStack>
              <IconFe name="chevron-right" color="#1f2937" size="24px" />
            </HStack>
          </Box>;
        }}
      </Pressable>
    )
  }

  return (
    <Center safeArea flex={1}>
      {/* <Text>This is {route.params.name}'s profile</Text> */}
      <Avatar bg="amber.500" size="xl" source={{
        uri: "https://bit.ly/broken-link"
      }}>
        MR
      </Avatar>
      <Text fontSize="2xl">John Legend</Text>
      <Text fontSize="md">Hi, I'm John.</Text>
      {ProfileButton({ text: "Edit Profile", icon: "users", onPress: "EditProfile" })}
      {ProfileButton({ text: "Emergency Contacts", icon: "user", onPress: "ECContacts" })}
      {ProfileButton({ text: "Change Password", icon: "user", onPress: "ChangePassword" })}
      <Button w="300" h="60" margin="10px" onPress={() => navigation.navigate("Login")}>
        Sign out
      </Button>
    </Center>
  );
};

export default Profile;