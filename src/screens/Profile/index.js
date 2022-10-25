import { Box, Button, Center, FormControl, Heading, HStack, Icon, Input, Link, MaterialIcons, Pressable, Text, VStack } from "native-base";

const Profile = ({ navigation, route }) => {
  return (
    <Center safeArea flex={1}>
      <Text>This is {route.params.name}'s profile</Text>
      <Button w="286" onPress={() => navigation.navigate('Home')}>
        Go Back
      </Button>
    </Center>
  );
};

export default Profile;