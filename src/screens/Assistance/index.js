import { Button, Center, Text } from "native-base";
import { View, StyleSheet } from "react-native";
import IconFe from 'react-native-vector-icons/Feather';
import AssistanceForm from "./AssistanceForm";
import AssistanceLists from "./AssistanceList";
import { contentLayout, color } from "../../../Style";

const style = StyleSheet.create({
  page: {
    alignSelf: "stretch",
    alignItems: "center"
  },
  content: {
    width: contentLayout.width,
    overflow: "scroll",
  },
  text: {
    fontSize: "16pt",
    color: "#8E8E8E"
  },
  button: {
    borderRadius: "20",
    backgroundColor: "#188FFC",
    width: "100pt",
    height: '35pt',
  },
  textBtn: {
    fontSize: "16pt",
    color: "#FFFFFF"
  }
});

const AssistanceScreen = ({ navigation }) => {

  return (
    <View style={style.page}>
      <Button
        style={style.button}
        leftIcon={<IconFe name="plus" size="sm" color={color.white} />}
        onPress={() => navigation.navigate(AssistanceForm)} >
        <Text style={style.textBtn}>Create</Text>
      </Button>
      <Center style={style.content}>
        <IconFe name="x-circle" size="50px" color={color.grey} />
        <Text style={style.text}>You haven't created any appointments.</Text>
      </Center>
      <AssistanceLists />
    </View>
  );
};

export default AssistanceScreen;