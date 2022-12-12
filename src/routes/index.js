import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeTabScreen from './Home';
import LoginStackScreen from './Login';
// import SOSScreen from '../screens/Home/SOS';

const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="Login" component={LoginStackScreen} />
                    <Stack.Screen name="Home" component={HomeTabScreen} />
                    {/* <Stack.Screen name="SOS" component={SOSScreen} /> */}
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default Routes;
