import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreen from "../screens/Chat/";
import ChatChannel from "../screens/Chat/ChatChannel/ChatChannel";
import MapScreen from "../screens/Chat/MapScreen";

const NavChatStack = createNativeStackNavigator();

const ChatStackScreen = () => {
  return (
    <NavChatStack.Navigator
      initialRouteName="Chat"
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <NavChatStack.Screen name="Chat" component={ChatScreen} />
      <NavChatStack.Screen name="ChatChannel" component={ChatChannel} />
      <NavChatStack.Screen name="MapScreen" component={MapScreen} />
    </NavChatStack.Navigator>
  );
};

export default ChatStackScreen;
