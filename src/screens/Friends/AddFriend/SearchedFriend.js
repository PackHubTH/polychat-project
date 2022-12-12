import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Center, Image, Text } from 'native-base';
import { color } from '../../../../Style';
import IconFe from 'react-native-vector-icons/Feather';
import { useAuthContext } from '../../../utils/auth/AuthContext';
import GenerateUid from '../../..//utils/generate/GenerateUid';
import CreateFriendRequest from '../../../utils/create/CreateFriendRequest';
import { useProfileStore } from '../../../store/ProfileStore';
import {
   collection,
   doc,
   getDoc,
   addDoc,
   getDocs,
   query,
   where,
   updateDoc,
   arrayUnion,
} from 'firebase/firestore';
import { firestoreDb } from '../../../utils/dbs/FireStore';

const SearchedFriend = ({ route }) => {
   const { user } = useAuthContext();
   const userData = useProfileStore((state) => state.userData);
   const [yourUser, setYourUser] = useState(null);
   const [sendYet, setSendYet] = useState(false);
   const [friendAlready, setFriendAlready] = useState(false);

   const searchUserById = async (search) => {
      console.log('route.params.searchUser', route.params.searchUser);
      const docRef = doc(firestoreDb, 'User', search);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
         setYourUser(docSnap.data());
         console.log('uidBro:', docSnap.data().userId);
      } else {
         console.log('No such document!');
      }
   };

   const updateUserFriendReq = async (newRequest, user) => {
      const ref = doc(firestoreDb, 'User', user.userId);

      await updateDoc(ref, {
         friendRequestId: arrayUnion(newRequest.requestId),
      });
   };

   const sendFriendRequest = (newRequest) => {
      console.log('sendFriendRequest', newRequest);

      addDoc(collection(firestoreDb, 'FriendRequest'), { ...newRequest }).then(
         () => {
            setSendYet(true);
         }
      );
   };

   const checkSendRequest = async () => {
      console.log('checkSendRequest');
      try {
         const requestsRef = collection(firestoreDb, 'FriendRequest');

         const q = query(requestsRef, where('sender', '==', user.uid));
         const querySnapshot = await getDocs(q);

         querySnapshot.forEach((doc) => {
            if (doc.data().receiver === route.params.searchUser.userId) {
               setSendYet(true);
               console.log('found');
            }
            console.log('requestttthere', ' => ', doc.data());
         });
      } catch (err) {
         console.log("brother, you don't have any request");
      }
   };

   const checkFriendYet = async () => {
      userData.friendList.forEach((friend) => {
         if (friend === route.params.searchUser.userId) {
            setFriendAlready(true);
         }
      });
   };

   useEffect(() => {
      checkFriendYet();
      checkSendRequest();
      searchUserById(user.uid);
   }, []);

   if (route.params.searchUser !== null && yourUser !== null) {
      return (
         <View style={styles.page}>
            <View style={styles.container}>
               <Center>
                  <View alignItems="start" style={styles.imgBox}>
                     <Image
                        size={100}
                        borderRadius={100}
                        source={{
                           uri:
                              route.params.searchUser.profilePic == '' ||
                              route.params.searchUser.profilePic == null
                                 ? 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'
                                 : route.params.searchUser.profilePic,
                        }}
                        alt="Friend's photo"
                     />
                  </View>
                  <Text fontSize={24} fontWeight={700}>
                     {route.params.searchUser.displayName}
                  </Text>
                  <View style={styles.addFrinedBox}>
                     {friendAlready ? (
                        <Center>
                           <IconFe
                              name="user-check"
                              size="25px"
                              color={color.lightBlue}
                              onPress={() => {}}
                           />
                           {sendYet ? (
                              <Text style={{ marginTop: 2, color: color.grey }}>
                                 Request sent
                              </Text>
                           ) : (
                              <Text
                                 style={{
                                    marginTop: 2,
                                    color: color.lightBlue,
                                 }}
                              >
                                 Already friend
                              </Text>
                           )}
                        </Center>
                     ) : (
                        <Center>
                           <IconFe
                              name="user-plus"
                              size="25px"
                              onPress={() => {
                                 const newRequest = CreateFriendRequest(
                                    user.uid,
                                    route.params.searchUser.userId,
                                    'pending',
                                    GenerateUid()
                                 );
                                 sendFriendRequest(newRequest);
                                 updateUserFriendReq(newRequest, yourUser);
                              }}
                           />
                           <Text style={{ marginTop: 2 }}>Add friend</Text>
                        </Center>
                     )}
                  </View>
               </Center>
            </View>
         </View>
      );
   } else {
      return (
         <View style={styles.page}>
            <View style={styles.container}>
               <Center>
                  <Text>Loading...</Text>
               </Center>
            </View>
         </View>
      );
   }
};

const styles = StyleSheet.create({
   page: {
      width: '100%',
      height: '100%',
      backgroundColor: color.white,
   },
   container: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
   },
   imgBox: {
      paddingBottom: 15,
   },
   addFrinedBox: {
      paddingTop: 20,
   },
});

export default SearchedFriend;
