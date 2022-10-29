import { Avatar, Box, Button, Center, Divider, FormControl, Heading, HStack, Icon, Input, Link, MaterialIcons, Pressable, Text, VStack } from "native-base";

import IconFe from 'react-native-vector-icons/Feather';

const ECContacts = ({ navigation, route }) => {

  const ECItem = ({ text }) => {
    return (
      <Box w="280px">
        <HStack space="20px" alignItems="center">
          <Avatar bg="amber.500" size="md" source={{
            uri: "https://bit.ly/broken-link"
          }}>
            MR
          </Avatar>
          <Text fontSize="16px">{text}</Text>
        </HStack>
        <Divider mb="20px" mt="20px" />
      </Box>
    )
  }

  return (
    <Center safeArea flex={1} justifyContent="flex-start" mt="32px">
      {ECItem({ text: "Merry An." })}
      {ECItem({ text: "Harry Samit" })}
      {ECItem({ text: "Smith Mathew" })}
      <Button bg="#188ffc" color="#fff" w="124px" h="36px" rounded="32px"
        leftIcon={<IconFe name="edit-3" color="#fff" size="16px" />}
      >
        Edit
      </Button>
    </Center>
  );
};

export default ECContacts;