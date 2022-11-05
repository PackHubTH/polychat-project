import { Center, Image, Text } from "native-base";
import { StyleSheet, View } from "react-native";

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
  return (
    <View style={[style.container, { marginTop: gap, width: width }]}>
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
