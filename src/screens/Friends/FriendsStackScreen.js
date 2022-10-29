import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FriendsScreen from ".";

const NavFriendStack = createNativeStackNavigator();

const FriendsStackScreen = () => {
  return (
    <NavFriendStack.Navigator
      initialRouteName="Friends"
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <NavFriendStack.Screen name="Friends" component={FriendsScreen} />
    </NavFriendStack.Navigator>
  );
};

export default FriendsStackScreen;
