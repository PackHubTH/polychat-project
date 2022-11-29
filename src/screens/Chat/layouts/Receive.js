import React from 'react';
import { View, StyleSheet } from 'react-native';

const Receive = (props) => {
    return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
});

export default Receive;
