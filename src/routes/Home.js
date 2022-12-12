import React from 'react';
import { Button, Text } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableWithoutFeedback } from 'react-native';

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

// const SOSIcon = (navigation) => {
//    return (
//       <TouchableWithoutFeedback>
//          <Button
//             variant="solid"
//             style={{
//                border: '4px solid white',
//                borderRadius: '100%',
//                backgroundColor: '#eb3434',
//                width: 56,
//                height: 56,
//                bottom: 20,
//             }}
//             onLongPress={() =>
//                // alert(
//                //    'We have notified your friends. Please wait for help from your friends.'
//                // )
//                navigation.navigate('SOS')
//             }
//             delayLongPress={2000}
//          >
//             SOS
//          </Button>
//       </TouchableWithoutFeedback>
//    );
// };

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
