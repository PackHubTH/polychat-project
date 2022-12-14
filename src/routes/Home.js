import React from 'react';
import { Text } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconFe from 'react-native-vector-icons/Feather';
import IconIo from 'react-native-vector-icons/Ionicons';
import IconMa from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/Home';
import FriendsStackScreen from './Friends';
import ChatStackScreen from './Chat';
import AssistanceStackScreen from './Assistance';
import ProfileStackScreen from './Profile';
import SOSIcon from '../components/SOSIcon';

const HomeTab = createBottomTabNavigator();

const HomeTabIcon = ({ focused, icon, text }) => {
    return (
        <>
            {icon}
            <Text
                color={focused ? '#188ffc' : '#1f2937'}
                fontSize="12px"
                textAlign="center"
                w="64px"
            >
                {text}
            </Text>
        </>
    );
};

const HomeTabScreen = ({ navigation }) => {
    return (
        <HomeTab.Navigator
            initialRouteName="ProfileHome"
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
            }}
        >
            <HomeTab.Screen
                name="ChatHome"
                component={ChatStackScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        HomeTabIcon({
                            focused,
                            icon: (
                                <IconIo
                                    name="chatbubble-outline"
                                    size="16px"
                                    color={focused ? '#188ffc' : '#1f2937'}
                                />
                            ),
                            text: 'Chats',
                        }),
                }}
            />
            <HomeTab.Screen
                name="AssistanceHome"
                component={AssistanceStackScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        HomeTabIcon({
                            focused,
                            icon: (
                                <IconMa
                                    name="hand-heart-outline"
                                    size="16px"
                                    color={focused ? '#188ffc' : '#1f2937'}
                                />
                            ),
                            text: 'Assistance',
                        }),
                }}
            />
            <HomeTab.Screen
                name="SOS"
                component={HomeScreen}
                options={{
                    tabBarButton: () => SOSIcon(navigation),
                }}
            />
            <HomeTab.Screen
                name="FriendsHome"
                component={FriendsStackScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        HomeTabIcon({
                            focused,
                            icon: (
                                <IconFe
                                    name="users"
                                    size="16px"
                                    color={focused ? '#188ffc' : '#1f2937'}
                                />
                            ),
                            text: 'Friends',
                        }),
                }}
            />
            <HomeTab.Screen
                name="ProfileHome"
                component={ProfileStackScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        HomeTabIcon({
                            focused,
                            icon: (
                                <IconFe
                                    name="user"
                                    size="16px"
                                    color={focused ? '#188ffc' : '#1f2937'}
                                />
                            ),
                            text: 'Profile',
                        }),
                }}
            />
        </HomeTab.Navigator>
    );
};

export default HomeTabScreen;
