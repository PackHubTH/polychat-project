import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AssistanceScreen from '../screens/Assistance';
import AssistanceForm from '../screens/Assistance/AssistanceForm';
import AssistanceList from '../screens/Assistance/AssistanceList';
import { Button, Text } from 'native-base';
import { color } from '../../Style';
import { useAssistanceStore } from '../store/AssistanceStore';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useEffect } from 'react';

import IconFe from 'react-native-vector-icons/Feather';


const AssistanceStack = createNativeStackNavigator();

const AssistanceStackScreen = ({ navigation, route }) => {

    const friendId = useAssistanceStore(state => state.friendId);
    const setFriendId = useAssistanceStore(state => state.setFriendId);

    useEffect(() => {
        let routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'AssistanceForm' || routeName === 'AssistanceList')
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        else navigation.setOptions({ tabBarStyle: { display: 'flex' } });
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
                headerShadowVisible: false,
                title: '',
            }}
        >
            <AssistanceStack.Screen name="Assistance" component={AssistanceScreen}
                options={{
                    headerRight: () => {
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
                }}
            />
            <AssistanceStack.Screen name="AssistanceForm" component={AssistanceForm} />
            <AssistanceStack.Screen name="AssistanceList" component={AssistanceList}
                options={{
                    headerLeft: () => (
                        <>
                            <IconFe
                                name="chevron-left"
                                size="28px"
                                onPress={() => {
                                    setFriendId('');
                                    navigation.navigate('AssistanceForm');
                                }}
                            />
                            <Text fontWeight="bold" fontSize="26px" pl={4}>
                My Assistance
                            </Text>
                        </>
                    ),
                    headerRight: () => {
                        if (friendId !== '')
                            return <Text color="#188ffc" fontSize="18px" onPress={() => navigation.navigate('AssistanceForm')} >Done</Text>;
                    },
                }
                }
            />
        </AssistanceStack.Navigator>
    );
};

export default AssistanceStackScreen;
