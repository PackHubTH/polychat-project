import { Avatar, Box, Button, Center, Flex, FormControl, Heading, HStack, Icon, Input, Link, MaterialIcons, Pressable, Text, VStack, Container } from 'native-base';
import { useEffect, useState } from 'react';
import { Ellipse } from 'react-native-svg';

import IconFe from 'react-native-vector-icons/Feather';

import { getUserData } from '../../utils/dbs/AuthDataOperator';
import { returnAuthContext } from '../../utils/auth/AuthContext';
import { getSamplePic } from '../../utils/dbs/StorageOperator';

import { useProfileStore } from '../../store/ProfileStore';

const Profile = ({ navigation, route }) => {

    const { user, logout } = returnAuthContext();

    const userData = useProfileStore(state => state.userData);
    const setUserData = useProfileStore(state => state.setUserData);

    useEffect(() => {
        getUserData(user.uid).then((data) => {
            setUserData(data);
            console.log('data here', data);
        });
    }, []);
    // if (user != null) {
    //   getUserData(user.uid).then((userData) => {
    //     // console.log(`TestUserData1: ${Object.values(userData)}`);
    //     Object.entries(userData).forEach(([key, value]) => {
    //       console.log(key, value)
    //     })
    //     // console.log('status', userData.status)
    //     //setUserData(userData);
    //   });
    // }

    const handleLogout = async () => {
        try {
            await logout();
            console.log('Logout Successful');
            navigation.navigate('Login');
        } catch (error) {
            console.log(error);
            console.log('Logout Failed');
        }

    };

    const ProfileButton = ({ text, icon, onPress, color = '#1f2937' }) => {
        return (
            <Pressable onPress={onPress} >
                {({
                    isHovered,
                    isFocused,
                    isPressed
                }) => {
                    return <Box bg={isPressed ? 'coolGray.200' : isHovered ? 'coolGray.200' : 'white'} style={{
                        transform: [{
                            scale: isPressed ? 0.96 : 1
                        }]
                    }} rounded="20px" shadow={3} marginTop="10px" marginBottom="10px"
                    >
                        <HStack w="300px" h="60px" px="6" justifyContent="space-between" alignItems="center">
                            <HStack alignItems="center" space={4}>
                                <IconFe name={icon} color={color} size="20px" />
                                <Text color={color}>{text}</Text>
                            </HStack>
                            {
                                color === '#1f2937' ?
                                    <IconFe name="chevron-right" color="#1f2937" size="24px" /> : null
                            }
                        </HStack>
                    </Box>;
                }}
            </Pressable>
        );
    };

    return (
        <Box safeArea flex={1} bg="#fff" justifyContent="flex-end" alignItems="center">
            <Avatar bg="amber.500" size="xl"
                source={
                    { uri: userData?.profilePic }
                }
                style={{
                    border: '4px solid white',
                    top: '5%',
                    zIndex: 1
                }}
            />
            <Center bg="#d9d9d9" w="100%" h="90%" borderTopLeftRadius="20px" borderTopRightRadius="20px" justifyContent="flex-start">
                <Text fontSize="md" fontWeight="bold" mt="60px">{userData?.displayName ?? '-'}</Text>
                <Text fontSize="sm" mt="8px" mb="40px">{userData?.status ?? '-'}</Text>
                {ProfileButton({ text: 'Edit Profile', icon: 'users', onPress: () => navigation.navigate('EditProfile') })}
                {ProfileButton({ text: 'Emergency Contacts', icon: 'user', onPress: () => navigation.navigate('ECContacts') })}
                {ProfileButton({ text: 'Change Password', icon: 'user', onPress: () => navigation.navigate('ChangePassword') })}
                {ProfileButton({ text: 'Sign out', icon: 'log-out', onPress: () => handleLogout(), color: '#eb3434' })}
                <Text fontSize="sm" color="coolGray.600" _dark={{
                    color: 'warmGray.200'
                }}>
          For dev: Go to {' '}
                </Text>
                <Link _text={{
                    color: 'indigo.500',
                    fontWeight: 'medium',
                    fontSize: 'sm'
                }} onPress={() => {
                    navigation.navigate('Login');
                }}>
          Main page
                </Link>
            </Center>
        </Box>
    );
};

export default Profile;