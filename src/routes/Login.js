import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Registration';

const LoginStack = createNativeStackNavigator();

const LoginStackScreen = () => {
    return (
        <LoginStack.Navigator screenOptions={{ headerShown: false }}>
            <LoginStack.Screen name="LoginPage" component={LoginScreen} />
            <LoginStack.Screen name="Register" component={RegisterScreen} />
        </LoginStack.Navigator>
    );
};

export default LoginStackScreen;