import { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Box, Input, Button } from "native-base";
import CreateMessage from "../../../utils/CreateMessage";
import { useAuthContext } from "../../../utils/auth/AuthContext";
import GenerateUid from "../../../utils/GenerateUid";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
  where,
} from "firebase/firestore";
import { firestoreDb } from "../../../utils/dbs/FireStore";
const InputBox = ({ friendData, setChannelMessages, userChat }) => {
  const { user } = useAuthContext();
  const [message, setMessage] = useState("");

  const updateChatChannelDoc = async (newMessageId) => {
    console.log("newMessageId");
    alert(userChat.channelId);
    console.log(newMessageId);
    console.log(userChat.channelId);
    // firestoreDb.collection(
    //   "ChatChannel".doc(userChat.channelId.toString()).update({
    //     messageId: arrayUnion(...newMessageId),
    //   })
    // );

    const docRef = collection(
      firestoreDb,
      "ChatChannel",
      where("channelId", "==", userChat.channelId)
    );

    await updateDoc(docRef, {
      messageId: arrayUnion(newMessageId),
    }).then(() => {
      console.log("ChatChannelupdateComplete");
    });
  };

  const sendChat = async (message) => {
    await addDoc(collection(firestoreDb, "Message"), {
      ...message,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Box style={styles.content} alignItems="center">
        <Input
          mx="3"
          value={message}
          placeholder="Input"
          w="100%"
          onChangeText={(e) => {
            setMessage(e);
          }}
        />
        <Button
          size={"xs"}
          onPress={() => {
            const newMessage = CreateMessage(
              user.uid,
              friendData.userId,
              message,
              "",
              serverTimestamp(),
              GenerateUid(),
              ""
            );
            sendChat(newMessage);
            updateChatChannelDoc(newMessage.messageId);
            setChannelMessages((prev) => {
              return [...prev, newMessage];
            });
            setMessage("");
          }}
        >
          send
        </Button>
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    position: "fixed",
    bottom: 0,
    backgroundColor: "#A5A58D",
  },
  content: { width: "80%", flexDirection: "row", justifyContent: "flex-start" },
  messageInput: {
    color: "white",
    width: "100%",
  },
});

export default InputBox;
