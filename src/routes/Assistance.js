import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AssistanceScreen from "../screens/Assistance";
import AssistanceForm from "../screens/Assistance/AssistanceForm";
import AssistanceList from "../screens/Assistance/AssistanceList";

const AssistanceStack = createNativeStackNavigator();

const AssistanceStackScreen = () => {
  return (
    <AssistanceStack.Navigator
      initialRouteName="Assistance"
      screenOptions={{
        tabBarShowLabel: false,
        style: {
          backgroundColor: "#fff",
        },
      }}
    >
      <AssistanceStack.Screen name="Assistance" component={AssistanceScreen} />
      <AssistanceStack.Screen name="AssistanceForm" component={AssistanceForm} />
      <AssistanceStack.Screen name="AssistanceList" component={AssistanceList} />
    </AssistanceStack.Navigator>
  );
};

export default AssistanceStackScreen;
