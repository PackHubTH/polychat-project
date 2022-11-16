import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "native-base";


import ChangePasswordScreen from "../screens/Profile/ChangePassword";
import EditProfileScreen from "../screens/Profile/EditProfile";
import ECContactsScreen from "../screens/Profile/ECContacts";
import ProfileScreen from "../screens/Profile";

const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerLeft: () => null,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 26,
        },
        style: {
          backgroundColor: "#fff",
        },
        tabBarShowLabel: false,
        // title: 'My home',
        // headerStyle: {
        //   border: "none",
        // },
        // headerTintColor: '#fff',

      }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 22,
          },
          headerShadowVisible: true,
          headerBackTitleVisible: false,

          // headerLeft: () => { return <Text>{"<"}</Text> },
        }}
      />
      <ProfileStack.Screen name="ECContacts" component={ECContactsScreen} />
      <ProfileStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;