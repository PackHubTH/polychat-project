import { Center, ScrollView, Text } from "native-base";
import IconFe from 'react-native-vector-icons/Feather';
import { color } from "../../../Style";
import AssistantCard from "../../components/AssistantCard";


// const data = []
const data = [
  {
    id: 1,
    title: "Appointment 1",
    name: "Dr. John Doe",
    date: "12/12/2020",
    time: "12:00",
    status: "Pending",
  },
  {
    id: 2,
    title: "Appointment 2",
    name: "Dr. John Doe",
    date: "12/12/2020",
    time: "12:00",
    status: "Pending",
  },
  {
    id: 3,
    title: "Appointment 2",
    name: "Dr. John Doe",
    date: "12/12/2020",
    time: "12:00",
    status: "Pending",
  },
  {
    id: 4,
    title: "Appointment 2",
    name: "Dr. John Doe",
    date: "12/12/2020",
    time: "12:00",
    status: "Pending",
  },
  {
    id: 5,
    title: "Appointment 2",
    name: "Dr. John Doe",
    date: "12/12/2020",
    time: "12:00",
    status: "Pending",
  },
  {
    id: 6,
    title: "Appointment 2",
    name: "Dr. John Doe",
    date: "12/12/2020",
    time: "12:00",
    status: "Pending",
  },
  {
    id: 7,
    title: "Appointment 2",
    name: "Dr. John Doe",
    date: "12/12/2020",
    time: "12:00",
    status: "Pending",
  },
]

const AssistanceScreen = ({ navigation }) => {

  return (
    <ScrollView bg={color.white}>
      <Center w="100%">
        {
          data.length !== 0 ?
            data.map((item, i) => {
              return (
                <AssistantCard key={i} />
              );
            }) :
            <>
              <IconFe name="x-circle" size="50px" color={color.grey} />
              <Text color={color.grey} fontSize="16px">You haven't created any appointments.</Text>
            </>
        }
      </Center>
    </ScrollView>
  );
};

export default AssistanceScreen;