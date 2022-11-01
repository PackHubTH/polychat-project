import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Center } from "native-base";
import Friend from "./Friend";
import { mock_friendsRequest, mock_friends } from "./data";
import Icon from "react-native-vector-icons/Feather";
import { color } from "../../../Style";
import RemoveItemArray from "../../utils/RemoveItemArray";

const style = StyleSheet.create({
  component: {
    flexWrap: 1,
    flexShrink: 1,
    backgroundColor: "#ffff",
    alignSelf: "stretch",
    borderRadius: 15,
    alignItems: "center",
    padding: 15,
    overflow: "scroll",
    marginTop: 20,

    // shadow
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  wrap: {
    width: "88%",
  },
  content: {},
  friendRequest: {
    alignContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 10,
    height: 50,
    flexDirection: "row",
  },
  command: {
    paddingLeft: "15%",
    height: "100%",
    width: "30%",
    alignItems: "center",
    flexDirection: "row",
  },
});

const FriendRequest = (props) => {
  const [friendRequests, setFriendRequests] = useState(mock_friendsRequest);

  return (
    <View style={style.component}>
      <View style={style.wrap}>
        <Text fontSize="lg" fontWeight={600}>
          Friend request
        </Text>

        <View style={style.content}>
          {friendRequests.map((e, i) => {
            return (
              <View key={i} style={style.friendRequest}>
                <Friend friend={e} gap={0} width={"70%"} />
                <Center style={style.command}>
                  <Icon
                    //accept friend and update
                    onPress={() => {
                      props.setFriends((previous) => [...previous, e]);
                      const array = RemoveItemArray(friendRequests, e);
                      setFriendRequests([...array]);
                    }}
                    name="check-circle"
                    size={18}
                    color={color.green}
                    style={{ paddingRight: 12 }}
                  />
                  <Icon
                    //reject friend
                    onPress={() => {
                      const array = RemoveItemArray(friendRequests, e);
                      setFriendRequests([...array]);
                    }}
                    name="x-circle"
                    size={18}
                    color={color.red}
                  />
                </Center>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default FriendRequest;
