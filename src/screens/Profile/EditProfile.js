import { Avatar, Box, Button, Center, FormControl, Heading, HStack, Icon, Input, Link, MaterialIcons, Pressable, Text, VStack } from "native-base";
import { FiEdit3 } from "react-icons/fi";

const EditProfile = ({ navigation, route }) => {

  return (
    <Center safeArea flex={1}>
      {/* <Text>This is {route.params.name}'s profile</Text> */}
      <Avatar bg="amber.500" size="xl" source={{
        uri: "https://bit.ly/broken-link"
      }}>
        MR
      </Avatar>
      <Text fontSize="2xl">John Legend</Text>
      <Text fontSize="md">Edit profile here!</Text>
    </Center>
  );
};

export default EditProfile;