import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreen from ".";
const NavChatStack = createNativeStackNavigator();
import ChatChannel from "./ChatChannel/ChatChannel";

const ChatStackScreen = () => {
  return (
    <NavChatStack.Navigator
      initialRouteName="Friends"
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <NavChatStack.Screen name="Chat" component={ChatScreen} />
      <NavChatStack.Screen name="ChatChannel" component={ChatChannel} />
    </NavChatStack.Navigator>
  );
};

export default ChatStackScreen;
