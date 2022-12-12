// import { Box, Button, Center, HStack, Pressable } from 'native-base';
// import React from 'react';
// import { onAuthStateChanged, signOut } from 'firebase/auth';

// import {
//    useAuthContext,
//    returnAuthContext,
// } from '../../utils/auth/FirebaseAuth';

// const Home = ({ navigation }) => {
//    const [selected, setSelected] = React.useState(1);
//    const { user, logout } = returnAuthContext();
//    // const [user, setUser] = React.useState({});

//    // onAuthStateChanged(auth, (currentUser) => {
//    //   setUser(currentUser);
//    // })

//    // const logout = async () => {
//    //   try {
//    //     await signOut(auth);
//    //     console.log("Logout success");
//    //   } catch(error) {
//    //     console.log(error);
//    //     throw new Error(`Can't logout`);
//    //   }
//    // };

//    const handleLogout = async () => {
//       try {
//          await logout();
//          navigation.navigate('Login');
//          console.log('Logged out');
//       } catch (error) {
//          console.log(error);
//       }
//    };

//    return (
//       // <Center safeArea flex={1}>
//       <Box
//          flex={1}
//          bg="white"
//          safeAreaTop
//          width="100%"
//          maxW="300px"
//          alignSelf="center"
//       >
//          <Button
//             w="286"
//             colorScheme="indigo"
//             onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
//          >
//             Current User: {user && user.email}
//          </Button>
//          <Button
//             w="286"
//             onPress={() => {
//                handleLogout();
//             }}
//          >
//             Sign Out
//          </Button>
//          <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
//             <Pressable
//                cursor="pointer"
//                opacity={selected === 0 ? 1 : 0.5}
//                py="3"
//                flex={1}
//                onPress={() => setSelected(0)}
//             />
//          </HStack>
//       </Box>
//       // </Center >
//    );
// };

// export default Home;
