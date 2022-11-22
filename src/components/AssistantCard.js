import { Avatar, Badge, Button, HStack, Modal, Pressable, Text, VStack } from "native-base";
import { useState } from "react";
import { color } from "../../Style";

const AssistantCard = ({ assistant }) => {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setModalVisible(true)}
        border="4px solid black"
      >
        {({
          isPressed,
          isHovered
        }) => {
          return (
            <VStack bg={isPressed ? "#8E8E8E" : isHovered ? "#8E8E8E" : "#FFFFFF"}
              style={{
                transform: [{
                  scale: isPressed ? 0.96 : 1
                }]
              }}
              rounded="20px" shadow={3} w="360px" marginTop="30px" p="14px 20px" space={2}
            >
              <HStack justifyContent="space-between">
                <Text fontWeight="medium" fontSize="16px">ช่วยเลือกชุดหน่อยครับ</Text>
                <Badge rounded="20px" variant="solid" w="70px" h="25px">
                  Waiting
                </Badge>
              </HStack>
              <HStack alignItems="center">
                <Text>My assistant:</Text>
                <Avatar size="8" marginX="8px"
                  source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" }} />
                <Text>Mary</Text>
              </HStack>
              <Text>Date: 19/11/2022</Text>
              <Text>Time: 19:05</Text>
            </VStack>
          );
        }}
      </Pressable>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header borderBottomWidth="0">Request Assistant</Modal.Header>
          <Modal.Body py="0">
            <VStack space={2}>
              <Text>Topic: ช่วยเลือกชุดหน่อยครับ</Text>
              <HStack alignItems="center">
                <Text>My assistant:</Text>
                <Avatar size="8" marginX="8px"
                  source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" }} />
                <Text>Mary</Text>
              </HStack>
              <Text>Date: 19/11/2022</Text>
              <Text>Time: 19:05</Text>
            </VStack>
          </Modal.Body>
          <Modal.Footer borderTopWidth="0" justifyContent="center">
            <Button.Group space={4}>
              <Button backgroundColor={color.green} rounded="20px" w="45%">Accept</Button>
              <Button backgroundColor={color.red} rounded="20px" w="45%" onPress={() => setModalVisible(false)}>Reject</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>

  );
}

export default AssistantCard;