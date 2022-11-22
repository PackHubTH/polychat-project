import { Avatar, Box, Center, HStack, Radio, ScrollView, Text } from "native-base";
import { View, Modal, Pressable, StyleSheet } from "react-native";
import IconFe from 'react-native-vector-icons/Feather';
import React, { useState } from "react";
import { color } from "../../../Style";

const AssistanceList = () => {

	return (
		<ScrollView bg={color.white}>
			<Center>
				<Box w="80%" mt="24px">
					<HStack alignItems="center" space={4}>
						<Text fontSize="2xl" fontWeight="bold">Friend's list</Text>
						<Text color={color.grey} fontSize="sm">Maximum at 1</Text>
					</HStack>
					<Radio.Group defaultValue="1">
						<Radio value="1" my={8}>
							<HStack w="100%" bg="#555" alignItems="center" space={4} ml="16px" py="16px">
								<Avatar size="50px" marginX="8px"
									source={{ uri: "http://placekitten.com/200/300" }} />
								<Text>Mary</Text>
							</HStack>
						</Radio>
						<Radio value="2" my={8}>
							<HStack w="100%" alignItems="center" space={4} ml="16px" py="16px">
								<Avatar size="50px" marginX="8px"
									source={{ uri: "http://placekitten.com/200/300" }} />
								<Text>Mary</Text>
							</HStack>
						</Radio>
						<Radio value="3" my={8}>
							<HStack w="100%" alignItems="center" space={4} ml="16px" py="16px">
								<Avatar size="50px" marginX="8px"
									source={{ uri: "http://placekitten.com/200/300" }} />
								<Text>Mary</Text>
							</HStack>
						</Radio>
						<Radio value="4" my={8}>
							<HStack w="100%" alignItems="center" space={4} ml="16px" py="16px">
								<Avatar size="50px" marginX="8px"
									source={{ uri: "http://placekitten.com/200/300" }} />
								<Text>Mary</Text>
							</HStack>
						</Radio>
						<Radio value="5" my={8}>
							<HStack w="100%" alignItems="center" space={4} ml="16px" py="16px">
								<Avatar size="50px" marginX="8px"
									source={{ uri: "http://placekitten.com/200/300" }} />
								<Text>Mary</Text>
							</HStack>
						</Radio>
					</Radio.Group>
				</Box>
			</Center>
		</ScrollView >
	);
}

export default AssistanceList;