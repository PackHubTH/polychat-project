import { StyleSheet, View } from 'react-native';
import Friend from '../../components/Friend';
import { Text } from 'native-base';

const style = StyleSheet.create({
    container: { width: '100%', marginTop: 20 },
});

const FriendList = (props) => {
    return (
        <View style={style.container}>
            <Text fontSize="lg" fontWeight={600}>
        Friend list
            </Text>

            {props.friends.map((e, i) => {
                return <Friend key={i} friend={e} gap={20} />;
            })}
        </View>
    );
};

export default FriendList;
