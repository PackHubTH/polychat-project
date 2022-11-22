import { Button, Center, FormControl, HStack, VStack, Input, Text, Pressable, Box } from "native-base";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import IconFe from 'react-native-vector-icons/Feather';
import Assistance from ".";
import AssistanceList from "./AssistanceList"
import React, { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { color } from "../../../Style";
import { useAssistanceStore } from "../../store/AssistanceStore";
import { useProfileStore } from "../../store/ProfileStore";
import shallow from 'zustand/shallow'
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { firestoreDb } from "../../utils/dbs/FireStore";


const AssistanceForm = ({ navigation }) => {

	// const [dateTime, setDateTime] = useState(new Date());
	// const [mode, setMode] = useState();
	// const [show, setShow] = useState(false);
	// const [dateInput, setDateInput] = useState("DD/MM/YYYY");
	// const [timeInput, setTimeInput] = useState("HH:MM");
	const { dateTime, mode, show, dateInput, timeInput, topic, friendId,
		setDateTime, setMode, setShow, setDateInput, setTimeInput, setTopic, setFriendId
	} = useAssistanceStore(
		(state) => ({
			dateTime: state.dateTime, mode: state.mode, show: state.show,
			dateInput: state.dateInput, timeInput: state.timeInput, topic: state.topic,
			friendId: state.friendId, setDateTime: state.setDateTime, setMode: state.setMode,
			setShow: state.setShow, setDateInput: state.setDateInput, setTimeInput: state.setTimeInput,
			setTopic: state.setTopic, setFriendId: state.setFriendId
		}),
		shallow
	)
	const userData = useProfileStore((state) => state.userData);

	const resetState = (mode) => {
		if (mode === "date") {
			setDateInput("DD/MM/YYYY");
			setTimeInput("HH:MM");
			setShow(false);
		}
		else if (mode === "all") {
			setDateTime(new Date());
			setMode();
			setShow(false);
			setDateInput("DD/MM/YYYY");
			setTimeInput("HH:MM");
			setTopic("");
			setFriendId("");
		}
	}

	const onChangeDateTime = (e, selectedDate) => {
		// dateTime sent to db
		const currentDate = selectedDate || dateTime;
		setDateTime(currentDate);
		console.log('currentDate', currentDate);

		// date show on screen
		let tempDate = new Date(currentDate);
		let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();

		// time show on screen
		let hours = tempDate.getHours();
		hours = (hours <= 9) ? ("0" + hours) : hours;
		let fTime = hours + ":" + (tempDate.getMinutes() < 10 ? "0" : "") + tempDate.getMinutes();

		setDateInput(fDate);
		setTimeInput(fTime);
		console.log(fDate + " (" + fTime + ")");
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	// const onPressCancelDate = () => {
	// 	setShow(false);
	// 	setDateInput("DD/MM/YYYY");
	// 	setTimeInput("HH:MM");
	// 	console.log("Cancel");
	// }

	// const onPressConfirmDate = () => {
	// 	setShow(false);
	// 	console.log("Confirm");
	// }

	const onPressCancel = () => {
		resetState("all");
		navigation.navigate("Assistance")
	}

	const OnPressCreate = async () => {
		if (topic === "" || friendId === "" || dateInput === "DD/MM/YYYY" || timeInput === "HH:MM") {
			alert("Please fill in all fields");
		}
		else {
			console.log("Create", topic, friendId, dateTime);
			// add to db
			const docRef = doc(firestoreDb, "User", userData.userId);
			await updateDoc(docRef, {
				assistantList: arrayUnion({
					topic: topic,
					friendId: friendId,
					dateTime: dateTime,
					status: "waiting"
				})
			});
			resetState("all");
			navigation.navigate("Assistance")
		}
	}

	return (
		<Box safeArea flex={1} bg={color.white} alignItems="center">
			<VStack w="286px" space={2} mt="30px" position="relative" alignItems="space-between">
				<FormControl isRequired mb="2">
					<FormControl.Label>Topic</FormControl.Label>
					<Input
						onChangeText={(e) => setTopic(e)}
						placeholder="Enter a topic"
						placeholderTextColor={color.grey}
						borderRadius="20"
						borderColor={color.grey}
					/>
				</FormControl>

				<FormControl isRequired mb="2">
					<FormControl.Label>Select your friend</FormControl.Label>
					<Pressable
						style={style.pressable}
						onPress={() => navigation.navigate(AssistanceList)} >
						<Text fontSize="12px" color={color.grey} marginLeft="12px" marginTop="6px">
							{
								friendId === "" ? "Choose your friend for help" : friendId
							}
						</Text>
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


					</HStack>
				</FormControl>

				{show && (
					<Box backgroundColor={color.white} w="286px" h="250px" position="absolute" top="80%" borderRadius="20" zIndex={2}>
						<DateTimePicker
							value={dateTime}
							mode={mode}
							display="spinner"
							onChange={onChangeDateTime}
							style={{ alignSelf: 'center', width: '90%', height: '85%' }}
						/>

						<HStack justifyContent="center" w="100%" space="20" borderTopWidth="1px" borderTopColor={color.lightGrey}>
							<TouchableOpacity>
								<Text fontSize="14px" fontWeight="bold" color={color.grey} top="7px"
									onPress={() => resetState("date")} >
									Reset
								</Text>
							</TouchableOpacity>
							<TouchableOpacity>
								<Text fontSize="14px" fontWeight="bold" color={color.lightBlue} top="7px"
									onPress={() => setShow(false)}>
									Confirm
								</Text>
							</TouchableOpacity>
						</HStack>
					</Box>
				)
				}

				<HStack justifyContent="space-between" w="100%" mt={4}>
					<Button borderRadius="20" backgroundColor={color.grey} w="48%"
						onPress={() => onPressCancel()}>
						<Text color={color.white}>Cancel</Text>
					</Button>
					<Button borderRadius="20" backgroundColor={color.lightBlue} w="48%"
						onPress={() => OnPressCreate()} >
						<Text color={color.white}>Create</Text>
					</Button>
				</HStack>
			</VStack >
		</Box >
	);
};

const style = StyleSheet.create({
	page: {
		alignSelf: "stretch",
		alignItems: "center",
	},
	inputBox: {
		borderRadius: "20",
		borderColor: "#8E8E8E",
		height: 34,
	},
	pressable: {
		borderWidth: "1px",
		borderRadius: "20",
		borderColor: "#8E8E8E",
		height: 34,
	},
});


export default AssistanceForm;