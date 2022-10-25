import { Box, Button, Center, HStack, Pressable } from 'native-base';
import React from 'react';

const Home = ({ navigation }) => {

  const [selected, setSelected] = React.useState(1);

  return (
    // <Center safeArea flex={1}>
    <Box flex={1} bg="white" safeAreaTop width="100%" maxW="300px" alignSelf="center">
      <Button w="286" colorScheme="indigo"
        onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
      >
        Jane's Profile
      </Button>
      <Button w="286" onPress={() => navigation.navigate('Login')}>
        Sign Out
      </Button>
      <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
        <Pressable cursor="pointer" opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} onPress={() => setSelected(0)} />
      </HStack>
    </Box>
    // </Center >
  );
};

export default Home;