import React from "react";
import { Box, Button, Center, FormControl, Heading, HStack, Icon, Image, Input, Link, MaterialIcons, Pressable, Text, VStack } from "native-base";

import Logo from '../../../assets/logo.png';

const Login = ({ navigation, route }) => {

  const [show, setShow] = React.useState(false);

  return (
    <Center safeArea flex={1} bg='#fff'>
      {/* <Box p="2" py="8" w="90%" maxW="286"> */}
      {/* <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
        Welcome to PolyChad
      </Heading> */}

      <Image source={Logo} alt="Alternate Text" w="192" h="160" />

      <VStack space={3} mt="5" alignItems="center">
        <FormControl isRequired>
          <FormControl.Label>Email ID</FormControl.Label>
          <Input placeholder="Email or Phone number" variant='rounded' w="286" />
          <FormControl.Label isRequired>Password</FormControl.Label>
          <Input placeholder="Password" variant='rounded' type="password" w="286" />
          <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1">
            Forget Password?
          </Link>
        </FormControl>
        <Button w="286" borderRadius="20" mt="2" colorScheme="indigo" onPress={() => navigation.navigate('Home')}>
          Sign in
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
            If you don't have an account, click{" "}
          </Text>
          <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
          }} href="#">
            Create Account
          </Link>
        </HStack>
      </VStack>
      {/* </Box> */}
    </Center>
  );
};

export default Login;