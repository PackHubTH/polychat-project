import { Avatar, Box, Button, Center, FormControl, Heading, HStack, Icon, Input, Link, MaterialIcons, Pressable, Text, VStack } from "native-base";

const EditProfile = ({ navigation, route }) => {

  return (
    <Center safeArea flex={1} bg="#fff" justifyContent="flex-start">
      {/* <Text>This is {route.params.name}'s profile</Text> */}
      <Avatar bg="amber.500" size="xl" mb="40px" mt="40px" source={{
        uri: "https://bit.ly/broken-link"
      }}>
        MR
      </Avatar>
      <FormControl mb="16px" w="286px">
        <FormControl.Label
          _text={{
            color: "#1f2937",
            fontWeight: "bold"
          }}
          mb="15px"
        >
          Display name
        </FormControl.Label>
        <Input placeholder="John Legendary" variant="rounded" h="42px" />
      </FormControl>
      <FormControl mb="16px" w="286px">
        <FormControl.Label
          _text={{
            color: "#1f2937",
            fontWeight: "bold"
          }}
          mb="15px"
        >
          Status
        </FormControl.Label>
        <Input placeholder="Hi, I'm John" variant="rounded" h="42px" />
      </FormControl>
    </Center>
  );
};

export default EditProfile;