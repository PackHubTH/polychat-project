import { useState } from 'react';
import * as Location from 'expo-location';
import { StyleSheet, SafeAreaView, TextInput, View } from 'react-native';
import { Box, Input, Button } from 'native-base';
import { color } from '../../../../Style';
import CreateMessage from '../../../utils/create/CreateMessage';
import { useAuthContext } from '../../../utils/auth/AuthContext';
import GenerateUid from '../../../utils/generate/GenerateUid';
import {
   collection,
   addDoc,
   FieldValue,
   serverTimestamp,
   doc,
   setDoc,
   updateDoc,
   arrayUnion,
   where,
} from 'firebase/firestore';
import IconFe from 'react-native-vector-icons/Feather';
import IconEn from 'react-native-vector-icons/Entypo';
import { firestoreDb } from '../../../utils/dbs/FireStore';

const InputBox = ({
   showSticker,
   setShowsticker,
   friendData,
   setChannelMessages,
   userChat,
}) => {
   const { user } = useAuthContext();
   const [message, setMessage] = useState('');

   const getLocation = async () => {
      let errorMsg = null;

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
         errorMsg = 'Permission to access location was denied';
         return;
      }

      let location = await Location.getCurrentPositionAsync({});

      let text = '';
      if (errorMsg) {
         text = errorMsg;
      } else if (location) {
         text = JSON.stringify(location);
      }

      let address = await Location.reverseGeocodeAsync(location.coords);

      let ans = {
         address:
            address[0].name +
            ', ' +
            address[0].city +
            ', ' +
            address[0].region +
            ', ' +
            address[0].country +
            ', ' +
            address[0].postalCode,
         latitude: location.coords.latitude,
         longitude: location.coords.longitude,
      };
      return ans;
   };

   const updateChatChannelDoc = async (newMessageId) => {
      try {
         await setDoc(doc(firestoreDb, 'ChatChannel', userChat.id), {
            ...userChat,
            messageId: [...userChat.messageId, newMessageId],
         });
      } catch (error) {
         console.log(error.message);
      }
   };

   const sendChat = async (message) => {
      await addDoc(collection(firestoreDb, 'Message'), {
         ...message,
      });
   };

   return (
      <SafeAreaView style={styles.container}>
         <Box style={styles.content} alignItems="center">
            <IconFe
               name="map-pin"
               size={25}
               onPress={async () => {
                  const timestamp = serverTimestamp();
                  const messageId = GenerateUid();
                  const location = await getLocation();

                  const newMessage = CreateMessage(
                     user.uid,
                     friendData.userId,
                     '',
                     location,
                     timestamp,
                     messageId,
                     ''
                  );
                  sendChat(newMessage);
                  updateChatChannelDoc(newMessage.messageId);
                  setChannelMessages((prev) => {
                     return [...prev, newMessage];
                  });
               }}
            />
            <IconEn
               name="emoji-happy"
               size={25}
               color={showSticker ? color.lightBlue : color.black}
               onPress={() => {
                  setShowsticker((prev) => {
                     return !prev;
                  });
               }}
            />
            <View style={[styles.inputBox, { paddingRight: 10 }]}>
               <TextInput
                  placeholder="Type a message"
                  style={styles.input}
                  onChange={(e) => {
                     setMessage(e.nativeEvent.text);
                  }}
               />
            </View>
            <IconFe
               name="send"
               size={25}
               onPress={() => {
                  if (message.length > 0) {
                     const newMessage = CreateMessage(
                        user.uid,
                        friendData.userId,
                        message,
                        '',
                        serverTimestamp(),
                        GenerateUid(),
                        ''
                     );
                     sendChat(newMessage);
                     updateChatChannelDoc(newMessage.messageId);
                     setChannelMessages((prev) => {
                        return [...prev, newMessage];
                     });
                     setMessage('');
                  }
               }}
            />
         </Box>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: 145,
      position: 'fixed',
      bottom: 0,
      backgroundColor: color.white,
   },
   content: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },

   inputBox: {
      backgroundColor: color.white,
      width: '80%',
      height: '100%',
   },
   input: {
      margin: 12,
      width: '90%',
      borderRadius: 20,
      borderWidth: 1,
      padding: 10,
      color: color.grey,
   },
});

export default InputBox;
