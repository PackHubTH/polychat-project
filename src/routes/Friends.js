import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "native-base";
import FriendsScreen from "../screens/Friends";

const NavFriendStack = createNativeStackNavigator();

const FriendsStackScreen = () => {
  return (
    <NavFriendStack.Navigator
      initialRouteName="Friends"
      screenOptions={{
        tabBarShowLabel: false,
        headerLeft: () => { return <Text fontWeight="bold" fontSize="26px" pl={4}>Friends</Text> },
        headerShadowVisible: false,
        title: "",
      }}
    >
      <NavFriendStack.Screen name="Friends" component={FriendsScreen} />
    </NavFriendStack.Navigator>
  );
};

export default FriendsStackScreen;
