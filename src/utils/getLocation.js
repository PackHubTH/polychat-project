import * as Location from 'expo-location';

const getLocation = async () => {
    let errorMsg = null;

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        errorMsg = 'Permission to access location was denied';
        return;
    }
    console.log('getLocation2');

    let location = await Location.getCurrentPositionAsync({});

    let text = '';
    console.log('PASS');
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    console.log('text', text);

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
    console.log('ans', ans);
};

export default getLocation;
