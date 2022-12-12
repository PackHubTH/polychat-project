import {
    Avatar,
    Box,
    Button,
    Center,
    FormControl,
    Heading,
    HStack,
    Icon,
    Input,
    Link,
    MaterialIcons,
    Pressable,
    Text,
    VStack,
} from 'native-base';
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    Platform,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const ChangePassword = ({ navigation, route }) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [text1, setText] = useState(null);
    const [text2, setText2] = useState(null);

    // useEffect(() => {
    //   (async () => {

    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //       setErrorMsg('Permission to access location was denied');
    //       return;
    //     }

    //     let location = await Location.getCurrentPositionAsync({});
    //     setLocation(location);
    //   })();
    // }, []);

    // let text = 'Waiting..';
    // console.log('PASS')
    // if (errorMsg) {
    //   text = errorMsg;
    // } else if (location) {
    //   text = JSON.stringify(location);
    // }

    const getLocation = async () => {
        setText('Waiting1..');
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        setText('Waiting2..');

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        let text = '';
        console.log('PASS');
        if (errorMsg) {
            text = errorMsg;
        } else if (location) {
            text = JSON.stringify(location);
        }
        setText(text);

        let address = await Location.reverseGeocodeAsync(location.coords);
        setText2(address);
        console.log('address', address);
    };
    // console.log(text2[0].name + ", " + text2[0].city + ", " + text2[0].region + ", " + text2[0].country + ", " + text2[0].postalCode)

    return (
        <Center safeArea flex={1}>
            <Button onPress={() => getLocation()}>My Location</Button>
            <Text fontSize="2xl">{text1}</Text>
            <Text fontSize="2xl">
                {text2 &&
               text2[0].name +
                  ', ' +
                  text2[0].city +
                  ', ' +
                  text2[0].region +
                  ', ' +
                  text2[0].country +
                  ', ' +
                  text2[0].postalCode}
            </Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{ latitude: '37.78825', longitude: '-122.4324' }}
                />
            </MapView>
            <TouchableOpacity
                style={[styles.button]}
                onLongPress={() => {
                    console.log('Long Press');
                }}
                delayLongPress={3000}
            >
                <Text>TEST</Text>
            </TouchableOpacity>
        </Center>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'yellow',
        width: '10%',
        height: '10%',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '40%',
        height: '40%',
    },
});

export default ChangePassword;
