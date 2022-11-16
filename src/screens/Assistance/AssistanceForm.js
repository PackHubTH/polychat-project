import { Button, Center, FormControl, HStack, VStack, Input, Text, Pressable, Box } from "native-base";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import IconFe from 'react-native-vector-icons/Feather';
import Assistance from ".";
import AssistanceList from "./AssistanceList"
import React, { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { color } from "../../../Style";

const style = StyleSheet.create({
		page: {
			alignSelf:"stretch",
			alignItems:"center",
		},
		inputBox: {
			borderRadius:"20",
			borderColor:"#8E8E8E",
			height:34,
		},
		pressable: {
			borderWidth:"1px",
			borderRadius:"20",
			borderColor:"#8E8E8E",
			height:34,
		},
});

const AssistanceForm = ({ navigation }) => {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState();
    const [show, setShow] = useState(false);
		const [dateInput, setDateInput] = useState("DD/MM/YYYY");
		const [timeInput, setTimeInput] = useState("HH:MM");
    
    const onChange = (e, selectedDate) => {
			const currentDate = selectedDate || date;
			setDate(currentDate);

			let tempDate = new Date(currentDate);
			let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();

			let hours = tempDate.getHours();
			hours = (hours <= 9) ? ("0" + hours) : hours;
			let fTime = hours + ":" + tempDate.getMinutes() + (tempDate.getMinutes() < 10 ? "0" : " ");

			setDateInput(fDate);
			setTimeInput(fTime);
			console.log(fDate + " (" + fTime + ")");
    };

    const showMode = (currentMode) => {
			setShow(true);
			setMode(currentMode);
    };

		const onPressCancel = () => {
			setShow(false);
			setDateInput("DD/MM/YYYY");
			setTimeInput("HH:MM");
			console.log("Cancel");
		}

		const onPressConfirm = () => {
			setShow(false);
			console.log("Confirm");
		}

  return (
    <View style={style.page}>
      <Center>
        <VStack w="286px" space={2} alignSelf="center" marginTop="30px">
          <FormControl isRequired mb="2">
            <FormControl.Label>Topic</FormControl.Label>
            <Input
              placeholder="Enter a topic"
							placeholderTextColor={color.grey}
              borderRadius="20"
              borderColor={color.grey}
              h="34px" />
          </FormControl>
          
          <FormControl isRequired mb="2">
            <FormControl.Label>Select your friend</FormControl.Label>
            <Pressable
								style={style.pressable}
                onPress={() => navigation.navigate(AssistanceList)} >
                <Text fontSize="12px" color={color.grey} marginLeft="12px" marginTop="6px">Choose your friend for help</Text>
            </Pressable>
          </FormControl>

          <FormControl isRequired mb="2">
            <FormControl.Label>Select date & time</FormControl.Label>
            <HStack justifyContent="space-between">
              <Pressable
                style={style.pressable}
                w="160px"
                onPress={() => showMode('date')} >
                <Text fontSize="12px" color={color.grey} marginLeft="12px" marginTop="6px">{dateInput}</Text>
              </Pressable>
              <Pressable
                style={style.pressable}
                w="110px"
                onPress={() => showMode('time')} >
								<Text fontSize="12px" color={color.grey} marginLeft="12px" marginTop="6px">{timeInput}</Text>
              </Pressable>

							{ show && (
								<Box backgroundColor={color.white} w="286px" h="250px" position="absolute" top="40px" borderRadius="20">
										<DateTimePicker
											value={date}
											mode={mode}
											display="spinner"
											onChange={onChange}
											style={{alignSelf: 'center', width: '90%', height: '85%'}}
										/>

										<HStack justifyContent="center" w="100%" space="20" borderTopWidth="1px" borderTopColor={color.lightGrey}>
											<TouchableOpacity>
												<Text fontSize="14px" fontWeight="bold" color={color.grey} top="7px"
													onPress={(onPressCancel)} >
													Cancel
													</Text>
											</TouchableOpacity>
											<TouchableOpacity>
												<Text fontSize="14px" fontWeight="bold" color={color.lightBlue} top="7px"
													onPress={(onPressConfirm)}>
													Confirm
												</Text>
											</TouchableOpacity>
										</HStack>
								</Box>
            	)}
            </HStack>
          </FormControl>
          
          <HStack justifyContent="space-between">
            <Button w="135px" borderRadius="20" backgroundColor={color.grey}
              onPress={() => navigation.navigate("Assistance")}>
              <Text color={color.white}>Cancel</Text>
            </Button>
            <Button w="135px" borderRadius="20" backgroundColor={color.lightBlue}
              onPress={() => console.log("click Submit!!!")} >
              <Text color={color.white}>Create</Text>
            </Button>
          </HStack>
        </VStack>
      </Center>
    </View>
  );
};

export default AssistanceForm;