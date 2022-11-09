import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useAuthContext } from "../../utils/auth/AuthContext";
import { firestoreDb } from "../../utils/dbs/FireStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getUserData } from "../../utils/dbs/AuthDataOperator";
import { color } from "../../../Style";
import FriendWithChat from "./FriendWithChat";

const ChatScreen = ({ navigation }) => {
  const { user } = useAuthContext();
  const [userChat, setUserChat] = useState([]);

  const getAllUserChat = async (userId) => {
    const chats = [];
    const collectionRef = collection(firestoreDb, "ChatChannel");
    try {
      let query1 = query(collectionRef, where("user1", "==", userId));
      const querySnap1 = await getDocs(query1);
      querySnap1.forEach((doc) => {
        console.log(
          `GetAllUserChat: Found chat id of ${
            doc.data().channelId
          } from 1st query`
        );
        chats.push(doc.data());
      });

      let query2 = query(collectionRef, where("user2", "==", userId));
      const querySnap2 = await getDocs(query2);
      querySnap2.forEach((doc) => {
        chats.push(doc.data());
      });

      if (chats.length != 0) {
        setUserChat(chats);
      } else {
        console.log(`GetAllUserChat: No chat found for ${userId}`);
        return [];
      }
    } catch (error) {
      console.log(error.message);
      throw new Error(
        `GetAllUserChat: Failed to get user's chat for ${userId}`
      );
    }
  };

  useEffect(() => {
    getUserData(user.uid).then((userData) => {
      setUserChat(userData.chatList);
      console.log("userData");
      console.log(userData);

      if (user.uid === userChat.user1) {
        getUserData(userChat.user2).then((friend) => {
          console.log(friend);
          setFriendData(friend);
        });
      } else {
        getUserData(userChat.user1).then((friend) => {
          console.log(friend);
          setFriendData(friend);
        });
      }
    });
    getAllUserChat(user.uid);
  }, []);
  return (
    <View style={styles.page}>
      {userChat.map((e, i) => {
        return <FriendWithChat userChat={e} navigation={navigation} key={i} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  page: { height: "100%", backgroundColor: color.white },
});

export default ChatScreen;
