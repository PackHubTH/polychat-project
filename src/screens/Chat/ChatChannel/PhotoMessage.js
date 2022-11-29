import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'native-base';

const PhotoMessage = ({ photo }) => {
    return <Image source={{ uri: photo }} style={styles.container} size="lg" />;
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
});

export default PhotoMessage;
