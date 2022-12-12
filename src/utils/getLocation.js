import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';

const getLocation = async () => {
    // const [location, setLocation] = useState(null);
    //  const [errorMsg, setErrorMsg] = useState(null);
    //  const [text1, setText] = useState(null);
    //  const [text2, setText2] = useState(null);
    let errorMsg = null;

    // setText('Waiting1..');
    console.log('getLocation');
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        errorMsg = 'Permission to access location was denied';
        // setErrorMsg('Permission to access location was denied');
        return;
    }
    // setText('Waiting2..');
    console.log('getLocation2');

    let location = await Location.getCurrentPositionAsync({});
    //  setLocation(location);

    let text = '';
    console.log('PASS');
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    // setText(text);
    console.log('text', text);

    let address = await Location.reverseGeocodeAsync(location.coords);
    // setText2(address);
    console.log('address', address);

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
    console.log('ans', ans);
};

export default getLocation;
