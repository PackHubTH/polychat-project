import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Center, Image, Text } from "native-base";
import { MaximumString } from "../../utils/MaximumString";
import { color, contentLayout } from "../../../Style";
import { getUserData } from "../../utils/dbs/AuthDataOperator";
import { useAuthContext } from "../../utils/auth/AuthContext";

const FriendWithChat = ({ userChat, navigation }) => {
  const [friendData, setFriendData] = useState(null);
  const { user } = useAuthContext();
  console.log(userChat);

  useEffect(() => {
    console.log("user uid form auth", user.uid);

    // get friend's information
    if (user.uid === userChat.user1) {
      getUserData(userChat.user2).then((friend) => {
        setFriendData(friend);
      });
    } else {
      getUserData(userChat.user1).then((friend) => {
        setFriendData(friend);
      });
    }
  }, []);
  if (friendData !== null) {
    return (
      <View
        onStartShouldSetResponder={() => {
          navigation.navigate("ChatChannel", {
            channelId: 1,
            friendData: friendData,
            userChat: userChat,
          });
        }}
        style={styles.container}
      >
        <View style={styles.content}>
          <View alignItems="start" style={styles.imgBox}>
            <Image
              size={50}
              borderRadius={100}
              source={{
                uri:
                  friendData.profilePic == ""
                    ? "https://images.complex.com/complex/images/c_crop,h_1606,w_1820,x_2,y_210/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/gyaok9o7zpdc5b96pzfi/marcus-rashford-marcus-rashford-marcus-rashford?fimg-ssr-default"
                    : friendData.profilePic,
              }}
              alt="Friend's photo"
            />
          </View>
          <Center style={styles.textBox}>
            <View style={styles.top}>
              <Text fontSize="md" style={styles.name}>
                {friendData.userId}
              </Text>
            </View>
            <Text fontSize="sm" style={styles.message}>
              {MaximumString("...", 35)}
            </Text>
          </Center>
        </View>
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    alignItems: "center",
    overflow: "scroll",
    marginTop: 20,
  },
  content: {
    width: contentLayout.width,
    flexDirection: "row",
  },
  imgBox: {
    paddingRight: 20,
  },
  textBox: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  top: {
    flexDirection: "row",
    width: 300,
  },
  message: { color: color.lightGrey },
});

export default FriendWithChat;
