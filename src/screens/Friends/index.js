import { StyleSheet, View } from "react-native";
import Friend from "./Friend";
import FriendList from "./FriendList";
import { contentLayout } from "../../../Style";
import { mock_friends } from "./data";
import FriendRequest from "./FriendRequest";

const style = StyleSheet.create({
  page: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  content: {
    width: contentLayout.width,
    overflow: "scroll",
  },
});

const FriendsScreen = () => {
  return (
    <View style={style.page}>
      <View style={style.content}>
        <FriendRequest />
        <FriendList>
          {mock_friends.map((e, i) => {
            return <Friend key={i} friend={e} gap={20} />;
          })}
        </FriendList>
      </View>
    </View>
  );
};

export default FriendsScreen;
