import { HStack, Text, Card, Badge, Button, Avatar } from "native-base";
import { View, Modal, Pressable, StyleSheet } from "react-native";
import IconFe from 'react-native-vector-icons/Feather';
import React, { useState } from "react";
import { color } from "../../../Style";

const style = StyleSheet.create({
		page: {
			alignSelf:"stretch",
			alignItems:"center",
		},
});

const AssistanceList = () => {

    const [modalVisible, setModalVisible] = useState(false);

		const onPressReject = () => {
			setModalVisible(false);
			console.log("Rejected");
		}

		const onPressAcept = () => {
			setModalVisible(false);
			console.log("Acepted");
		}

  return (
    <View style={style.page}>
				<Pressable onPress={() => setModalVisible(true)} >
					{({
						isPressed,
						isHovered
					}) => {
						return (
							<Card bg={isPressed ? "#8E8E8E" : isHovered ? "#8E8E8E" : "#FFFFFF"} 
								style={{
									transform: [{
										scale: isPressed ? 0.96 : 1
									}]
								}} 
								borderRadius="20" w="315px" marginTop="30px"
							>
								<HStack justifyContent="space-between">
									<Text fontWeight="medium"ontSize="16px">ช่วยเลือกชุดหน่อยครับ</Text>
									<Badge backgroundColor={color.grey} borderRadius="20" w="70px" h="25px">
										<Text fontSize="12px" color={color.white}>Waiting</Text>
									</Badge>
								</HStack>
								<HStack>
									<Text marginTop="18px">My assistant:</Text>
									<Avatar size="8" margin="8px"
											source={{uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"}} /> 
									<Text marginLeft="5px" marginTop="18px">Mary</Text>
								</HStack>
								<Text marginTop="10px">Date: 19/11/2022</Text>
								<Text marginTop="10px">Time: 19:05</Text>
						</Card>
						);
					}}
				</Pressable>

        <Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
				>
					<View flex="1" justifyContent="center" alignItems="center" backgroundColor="rgba(31, 41, 55, 0.2)">
						<Card backgroundColor={color.white} borderRadius="20" w="80%">
							<HStack justifyContent="space-between">
								<Text fontWeight="bold" fontSize="18px">Request assistance</Text>
								<IconFe name="x" size="24" onPress={() => setModalVisible(!modalVisible)} />
							</HStack>
							<Text marginTop="14px">Topic: ช่วยเลือกชุดหน่อยครับ</Text>
							<HStack>
									<Text marginTop="18px">My assistant:</Text>
									<Avatar size="8" margin="8px"
										source={{uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"}} /> 
									<Text marginLeft="5px" marginTop="18px">Mary</Text>
								</HStack>
							<Text marginTop="10px">Date: 19/11/2022</Text>
							<Text marginTop="10px">Time: 19:05</Text>
							<HStack marginTop="15px" justifyContent="center" space={4}>
								<Button backgroundColor={color.red} w="45%" borderRadius="20"
									onPress={(onPressReject)}>
									<Text color={color.white}>Reject</Text>
								</Button>
								<Button backgroundColor={color.green} w="45%" borderRadius="20"
									onPress={(onPressAcept)}>
									<Text color={color.white}>Accept</Text>
								</Button>
							</HStack>
						</Card>
          </View>
        </Modal>
    </View>
  );
};

export default AssistanceList;