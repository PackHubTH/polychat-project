import { StyleSheet, View } from "react-native";
import FriendList from "./FriendList";
import { contentLayout } from "../../../Style";
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
        <FriendList />
      </View>
    </View>
  );
};

export default FriendsScreen;
