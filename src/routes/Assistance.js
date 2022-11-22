import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AssistanceScreen from "../screens/Assistance";
import AssistanceForm from "../screens/Assistance/AssistanceForm";
import AssistanceList from "../screens/Assistance/AssistanceList";
import { Button, Text } from "native-base";
import { color } from "../../Style";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useEffect } from "react";

import IconFe from 'react-native-vector-icons/Feather';


const AssistanceStack = createNativeStackNavigator();

const AssistanceStackScreen = ({ navigation, route }) => {

  useEffect(() => {
    let routeName = getFocusedRouteNameFromRoute(route);
    console.log(routeName);
  }, [route]);

  return (
    <AssistanceStack.Navigator
      initialRouteName="Assistance"
      screenOptions={{
        tabBarShowLabel: false,
        headerLeft: () => {
          return (
            <Text fontWeight="bold" fontSize="26px" pl={4}>
              My Assistance
            </Text>
          );
        },
        headerRight: () => {
          // console.log(routeName);
          // console.log(route);
          // if (routeName === "Assistance")
          return (
            <Button
              borderRadius="20px"
              backgroundColor={color.lightBlue}
              width="100px"
              // height="35px"
              leftIcon={<IconFe name="plus" size="sm" color={color.white} />}
              onPress={() => navigation.navigate(AssistanceForm)} >
              <Text color={color.white}>Create</Text>
            </Button>
          );
        },
        headerShadowVisible: false,
        title: '',
      }}
    >
      <AssistanceStack.Screen name="Assistance" component={AssistanceScreen} />
      <AssistanceStack.Screen name="AssistanceForm" component={AssistanceForm} />
      <AssistanceStack.Screen name="AssistanceList" component={AssistanceList} />
    </AssistanceStack.Navigator>
  );
};

export default AssistanceStackScreen;
