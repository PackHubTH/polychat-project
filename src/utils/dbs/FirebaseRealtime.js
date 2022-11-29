import { firebase } from '@react-native-firebase/database';
import {
    REACT_APP_REALTIME_URL
} from '@env';

const reference = firebase
    .app()
    .database(REACT_APP_REALTIME_URL)
    .ref('/');