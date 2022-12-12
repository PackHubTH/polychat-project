import { Text } from 'native-base';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestoreDb } from '../utils/dbs/FireStore';
import { useProfileStore } from '../store/ProfileStore';

const SaveEditProfile = ({ navigation }) => {
   const tempDisplayName = useProfileStore((state) => state.tempDisplayName);
   const tempStatus = useProfileStore((state) => state.tempStatus);
   const userData = useProfileStore((state) => state.userData);

   // Save edit profile
   const saveEditProfile = async () => {
      const docRef = doc(firestoreDb, 'User', userData.userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
         console.log('Document data:', docSnap.data());
         await updateDoc(docRef, {
            displayName: userData.displayName,
            status: userData.status,
         });
         navigation.navigate('Profile');
      } else {
         console.log('No such document!');
         alert('No such document!');
      }
   };

   // Check if user edit profile
   if (
      tempDisplayName !== userData.displayName ||
      tempStatus !== userData.status
   )
      return (
         <Text
            color="#188ffc"
            fontSize="18px"
            onPress={() => saveEditProfile()}
         >
            Save
         </Text>
      );
};

export default SaveEditProfile;
