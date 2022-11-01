import { StyleSheet, View } from "react-native";
import FriendList from "./FriendList";
import { contentLayout } from "../../../Style";
import FriendRequest from "./FriendRequest";
import { useState } from "react";
import { mock_friends } from "./data";

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
  const [friends, setFriends] = useState(mock_friends);
  return (
    <View style={style.page}>
      <View style={style.content}>
        <FriendRequest setFriends={setFriends} />
        <FriendList friends={friends} />
      </View>
    </View>
  );
};

export default FriendsScreen;
