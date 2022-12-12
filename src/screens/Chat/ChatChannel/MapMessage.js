import { HStack, Pressable, Text } from 'native-base';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { color } from '../../../../Style';
import TimeChat from '../../../components/TimeChat';

const MapMessage = ({ location, isSender, navigation, time }) => {
    return (
        <View
            style={[
                styles.container,
                isSender ? styles.alignSend : styles.alignReceive,
            ]}
        >
            <HStack alignItems="flex-end" space={2}>
                {isSender && <TimeChat time={new Date(time)} />}
                <Pressable
                    style={[
                        styles.card,
                        isSender ? styles.bgColorSend : styles.bgColorReceive,
                    ]}
                    onPress={() => {
                        navigation.navigate('Location', { location: location });
                    }}
                >
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.06969,
                            longitudeDelta: 0.0069,
                        }}
                        zoomEnabled={false}
                        scrollEnabled={false}
                    >
                        <Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                        />
                    </MapView>
                    <Text
                        m="0"
                        px="2"
                        color={isSender ? 'black' : 'white'}
                        noOfLines={2}
                        fontSize="12px"
                        isTruncated
                    >
                        {location.address}
                    </Text>
                </Pressable>
                {!isSender && <TimeChat time={new Date(time)} />}
            </HStack>
        </View>
    );
};

const styles = StyleSheet.create({
    alignSend: {
        alignItems: 'flex-end',
    },
    alignReceive: {
        alignItems: 'flex-start',
    },
    bgColorSend: {
        backgroundColor: color.white,
    },
    bgColorReceive: {
        backgroundColor: color.lightBlue,
    },
    card: {
        width: '28%',
        height: '100%',
        borderRadius: '8%',
    },
    container: {
        marginTop: 12,
        minHeight: 32,
        width: '100%',
        height: 200,
        flexDirection: 'column',
    },
    map: {
        width: '100%',
        height: '80%',
        borderRadius: '8%',
    },
});

export default MapMessage;
