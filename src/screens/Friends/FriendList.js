import { StyleSheet, View } from "react-native";
import Friend from "./Friend";
import { Text } from "native-base";
import { mock_friends } from "./data";

const style = StyleSheet.create({
  container: { width: "100%", marginTop: 20 },
});

const FriendList = () => {
  return (
    <View style={style.container}>
      <Text fontSize="lg" fontWeight={600}>
        Friend list
      </Text>

      {mock_friends.map((e, i) => {
        return <Friend key={i} friend={e} gap={20} />;
      })}
    </View>
  );
};

export default FriendList;
