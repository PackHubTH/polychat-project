import { useState } from "react";
import { Center, Image, Text } from "native-base";
import { StyleSheet, View } from "react-native";
import FriendModal from "./FriendModal";

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    marginTop: 20,
  },
  imgBox: {
    paddingRight: 20,
  },
});

const Friend = ({ friend, gap, width }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      onStartShouldSetResponder={() => {
        setModalVisible(true);
      }}
      style={[style.container, { marginTop: gap, width: width }]}
    >
      {modalVisible ? (
        <FriendModal
          friend={friend}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : null}
      <View alignItems="start" style={style.imgBox}>
        <Image
          size={50}
          borderRadius={100}
          source={{
            uri: friend.img,
          }}
          alt="Friend's photo"
        />
      </View>
      <Center style={style.textBox}>
        <Text fontSize="md">{friend.name}</Text>
      </Center>
    </View>
  );
};

export default Friend;
