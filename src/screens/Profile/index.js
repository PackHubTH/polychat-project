import { Avatar, Box, Button, Center, Flex, FormControl, Heading, HStack, Icon, Input, Link, MaterialIcons, Pressable, Text, VStack } from "native-base";

import IconFe from 'react-native-vector-icons/Feather';

import { returnAuthContext } from "../../auth/AuthContext";

const Profile = ({ navigation, route }) => {

  const { user , logout } = returnAuthContext();

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
  
  const handleLogout = async () => {
   try {
     await logout();
     console.log("Logout Successful");
     navigation.navigate("Login");
   } catch (error) {
      console.log(error);
      console.log("Logout Failed");
   }

  }

  return (
    <Center safeArea flex={1}>
      {/* <Text>This is {route.params.name}'s profile</Text> */}
      <Avatar bg="amber.500" size="xl" source={{
        uri: "https://bit.ly/broken-link"
      }}>
        MR
      </Avatar>
      <Text fontSize="2xl">{user && user.email}</Text>
      <Text fontSize="md">Hi, I'm John.</Text>
      {ProfileButton({ text: "Edit Profile", icon: "users", onPress: "EditProfile" })}
      {ProfileButton({ text: "Emergency Contacts", icon: "user", onPress: "ECContacts" })}
      {ProfileButton({ text: "Change Password", icon: "user", onPress: "ChangePassword" })}
      <Button w="300" h="60" margin="10px" onPress={() => handleLogout()}>
        Sign out
      </Button>
      <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
            For dev: Go to {" "}
          </Text>
          <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
          }} onPress={() => { 
            navigation.navigate('Login') 
            }}>
            Main page
          </Link>
    </Center>
  );
};

export default Profile;