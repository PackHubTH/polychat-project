import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text } from 'native-base';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useEffect } from 'react';

import { useProfileStore } from '../store/ProfileStore';
import { useEditProfileStore } from '../store/EditProfileStore';

import IconFe from 'react-native-vector-icons/Feather';

import ChangePasswordScreen from '../screens/Profile/ChangePassword';
import EditProfileScreen from '../screens/Profile/EditProfile';
import ECContactsScreen from '../screens/Profile/ECContacts';
import ECListScreen from '../screens/Profile/ECList';
import ProfileScreen from '../screens/Profile';
import SaveEditProfile from '../components/SaveEditProfile';

const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = ({ navigation, route }) => {
    const tempDisplayName = useProfileStore((state) => state.tempDisplayName);
    const tempStatus = useProfileStore((state) => state.tempStatus);
    const userData = useProfileStore((state) => state.userData);
    const setShowModal = useEditProfileStore((state) => state.setShowModal);

    useEffect(() => {
        let routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'EditProfile')
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        else navigation.setOptions({ tabBarStyle: { display: 'flex' } });
        console.log(routeName);
    }, [route]);

    return (
        <ProfileStack.Navigator
            initialRouteName="Profile"
            screenOptions={{
                tabBarShowLabel: false,
                headerLeft: () => {
                    return (
                        <Text fontWeight="bold" fontSize="26px" pl={4}>
                     Profile
                        </Text>
                    );
                },
                headerShadowVisible: false,
                title: '',
            }}
        >
            <ProfileStack.Screen name="Profile" component={ProfileScreen} />
            <ProfileStack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 22,
                    },
                    headerShadowVisible: true,
                    headerBackTitleVisible: false,
                    headerLeft: () => (
                        <IconFe
                            name="chevron-left"
                            size="28px"
                            onPress={() => {
                                if (
                                    tempDisplayName !== userData.displayName ||
                           tempStatus !== userData.status
                                )
                                    setShowModal(true);
                                else navigation.navigate('Profile');
                            }}
                        />
                    ),
                    headerRight: () => <SaveEditProfile navigation={navigation} />,
                    title: 'Edit profile',
                }}
            />
            <ProfileStack.Screen
                name="ECContacts"
                component={ECContactsScreen}
                options={{
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 22,
                    },
                    headerShadowVisible: true,
                    headerBackTitleVisible: false,
                    headerLeft: () => (
                        <IconFe
                            name="chevron-left"
                            size="28px"
                            onPress={() => {
                                navigation.navigate('Profile');
                            }}
                            //  onPress={() => {
                            //     if (
                            //        tempDisplayName !== userData.displayName ||
                            //        tempStatus !== userData.status
                            //     )
                            //        setShowModal(true);
                            //     else navigation.navigate('Profile');
                            //  }}
                        />
                    ),
                    title: 'Emergency Contacts',
                }}
            />
            <ProfileStack.Screen
                name="ECList"
                component={ECListScreen}
                options={{
                    headerLeft: () => (
                        <>
                            <IconFe
                                name="chevron-left"
                                size="28px"
                                onPress={() => {
                                    navigation.navigate('ECContacts');
                                }}
                            />
                            <Text fontWeight="bold" fontSize="26px" pl={4}>
                        Emergency Contacts
                            </Text>
                        </>
                    ),
                }}
            />
            <ProfileStack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
            />
        </ProfileStack.Navigator>
    );
};

export default ProfileStackScreen;
