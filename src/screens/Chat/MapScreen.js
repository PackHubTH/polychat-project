
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {

    const { location } = route.params;

    if (location)
        return (
        // <Center safeArea flex={1}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.06969,
                    longitudeDelta: 0.0069,
                }}
            >
                <Marker
                    coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                />
            </MapView>
        // </Center>
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default MapScreen;