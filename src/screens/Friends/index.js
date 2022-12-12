import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import FriendList from './FriendList';
import { contentLayout } from '../../../Style';
import FriendRequest from './FriendRequest';
import { useState } from 'react';
import { mock_friends } from './data';
import { Text } from 'native-base';
import { useAuthContext } from '../../utils/auth/AuthContext';

import {
   collection,
   doc,
   getDoc,
   addDoc,
   setDoc,
   query,
   where,
   onSnapshot,
   collectionGroup,
   getDocs,
} from 'firebase/firestore';

import { firestoreDb } from '../../utils/dbs/FireStore';

const style = StyleSheet.create({
   page: {
      alignSelf: 'stretch',
      alignItems: 'center',
   },
   content: {
      width: contentLayout.width,
      overflow: 'scroll',
   },
});

const FriendsScreen = ({ navigation }) => {
   const [dbFriends, setDbFriends] = useState([]);

   const { user } = useAuthContext();
   const [yourUser, setYourUser] = useState(null);

   const searchUser = async () => {
      const docRef = doc(firestoreDb, 'User', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
         setYourUser(docSnap.data());
         return docSnap.data();
      } else {
         console.log('No such document!');
      }
   };

   const searchFriends = async (arrayId) => {
      if (arrayId.length > 0) {
         arrayId.map(async (id) => {
            const docRef = doc(firestoreDb, 'User', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
               setDbFriends((prev) => {
                  return [...prev, docSnap.data()];
               });
            } else {
               console.log('No such document for' + id);
            }
         });
      }
   };

   useEffect(() => {
      searchUser().then((e) => {
         searchFriends(e.friendList);
      });
   }, []);

   if (dbFriends.length !== 0) {
      return (
         <View style={style.page}>
            <View style={style.content}>
               <FriendRequest setDbFriends={setDbFriends} />
               <FriendList friends={dbFriends} navigation={navigation} />
            </View>
         </View>
      );
   } else {
      return (
         <View style={style.page}>
            <View style={style.content}>
               <FriendRequest setDbFriends={setDbFriends} />
               <FriendList friends={dbFriends} navigation={navigation} />
               <Text>No friend now...</Text>
            </View>
         </View>
      );
   }
};

export default FriendsScreen;
