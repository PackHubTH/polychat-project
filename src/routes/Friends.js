import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'native-base';
import FriendsScreen from '../screens/Friends';
import AddFriend from '../screens/Friends/AddFriend/AddFriend';

const NavFriendStack = createNativeStackNavigator();
import IconFe from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Octicons';
import SearchedFriend from '../screens/Friends/AddFriend/SearchedFriend';
import { color } from '../../Style';

const FriendsStackScreen = ({ navigation }) => {
    return (
        <NavFriendStack.Navigator
            initialRouteName="Friends"
            screenOptions={{
                tabBarShowLabel: false,
                headerLeft: () => {
                    return (
                        <Text fontWeight="bold" fontSize="26px" pl={4}>
                     Friends
                        </Text>
                    );
                },
                headerShadowVisible: false,
                title: '',
            }}
        >
            <NavFriendStack.Screen
                name="Friends"
                component={FriendsScreen}
                options={{
                    headerRight: () => (
                        <Icon
                            name="person-add"
                            size="25px"
                            onPress={() => navigation.navigate('AddFriend')}
                        />
                    ),
                }}
            />
            <NavFriendStack.Screen
                name="AddFriend"
                component={AddFriend}
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
                                navigation.navigate('Friends');
                            }}
                        />
                    ),
                    title: 'Add Friend',
                }}
            />
            <NavFriendStack.Screen
                name="SearchedFriend"
                component={SearchedFriend}
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
                                navigation.navigate('AddFriend');
                            }}
                        />
                    ),
                    title: 'Add Friend',
                }}
            />
        </NavFriendStack.Navigator>
    );
};

export default FriendsStackScreen;
