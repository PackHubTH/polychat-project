import React, { useEffect } from 'react';
import { Text } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ChatScreen from '../screens/Chat/';
import ChatChannel from '../screens/Chat/ChatChannel/ChatChannel';
import MapScreen from '../screens/Chat/MapScreen';

import { useChatChannelStore } from '../store/ChatChannelStore';

import IconFe from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Octicons';

const NavChatStack = createNativeStackNavigator();

const ChatStackScreen = ({ navigation, route }) => {
    const friendData = useChatChannelStore((state) => state.friendData);
    const userChat = useChatChannelStore((state) => state.userChat);

    useEffect(() => {
        let routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'ChatChannel' || routeName === 'Location')
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        else navigation.setOptions({ tabBarStyle: { display: 'flex' } });
        console.log(routeName);
    }, [route]);

    return (
        <NavChatStack.Navigator
            initialRouteName="Chat"
            screenOptions={{
                tabBarShowLabel: false,
                headerLeft: () => {
                    return (
                        <Text fontWeight="bold" fontSize="26px" pl={4}>
                     Chats
                        </Text>
                    );
                },
                headerShadowVisible: false,
                title: '',
            }}
        >
            <NavChatStack.Screen name="Chat" component={ChatScreen} />
            <NavChatStack.Screen
                name="ChatChannel"
                component={ChatChannel}
                options={{
                    headerLeft: () => (
                        <IconFe
                            name="chevron-left"
                            size="28px"
                            onPress={() => navigation.navigate('Chat')}
                        />
                    ),
                }}
            />
            <NavChatStack.Screen
                name="Location"
                component={MapScreen}
                options={{
                    headerLeft: () => (
                        <IconFe
                            name="chevron-left"
                            size="28px"
                            onPress={() =>
                                navigation.navigate('ChatChannel', {
                                    friendData: friendData,
                                    userChat: userChat,
                                })
                            }
                        />
                    ),
                }}
            // TODO: move param data to zustand
            />
        </NavChatStack.Navigator>
    );
};

export default ChatStackScreen;
