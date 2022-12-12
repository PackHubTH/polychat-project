import { Text } from 'native-base';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestoreDb } from '../utils/dbs/FireStore';

import { returnAuthContext } from '../utils/auth/AuthContext';
import { useProfileStore } from '../store/ProfileStore';


const SaveEditProfile = ({ navigation }) => {

    // const { user } = returnAuthContext();
    const tempDisplayName = useProfileStore((state) => state.tempDisplayName);
    const tempStatus = useProfileStore((state) => state.tempStatus);
    const userData = useProfileStore((state) => state.userData);
    // console.log('userData', userData);
    // console.log("SaveEditProfile: user: ", user);

    const saveEditProfile = async () => {
        const docRef = doc(firestoreDb, 'User', userData.userId);
        // const docRef = doc(firestoreDb, "User", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log('Document data:', docSnap.data());
            await updateDoc(docRef, {
                'displayName': userData.displayName,
                'status': userData.status,
            });
            navigation.navigate('Profile');
        } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
            alert('No such document!');
        }
    };

    if (tempDisplayName !== userData.displayName || tempStatus !== userData.status)
        return <Text color="#188ffc" fontSize="18px" onPress={() => saveEditProfile()} > Save</Text>;
};

export default SaveEditProfile;