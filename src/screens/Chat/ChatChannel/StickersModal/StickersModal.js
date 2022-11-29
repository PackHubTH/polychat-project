import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { color } from '../../../../../Style';
import { Box, Text } from 'native-base';
import StickerList from './StickerList';
import CreateMessage from '../../../../utils/CreateMessage';

const stickerSet = [
    {
        type: 'Standard',
        sticker: [
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
            'https://e0.365dm.com/22/08/768x432/skysports-casemiro-real-madrid_5865118.jpg?20220815085256',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
            'https://e0.365dm.com/22/08/768x432/skysports-casemiro-real-madrid_5865118.jpg?20220815085256',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
        ],
    },
    {
        type: 'Standard',
        sticker: [
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
            'https://e0.365dm.com/22/08/768x432/skysports-casemiro-real-madrid_5865118.jpg?20220815085256',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
            'https://e0.365dm.com/22/08/768x432/skysports-casemiro-real-madrid_5865118.jpg?20220815085256',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
        ],
    },
    {
        type: 'Standard',
        sticker: [
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
            'https://e0.365dm.com/22/08/768x432/skysports-casemiro-real-madrid_5865118.jpg?20220815085256',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
            'https://e0.365dm.com/22/08/768x432/skysports-casemiro-real-madrid_5865118.jpg?20220815085256',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
        ],
    },
    {
        type: 'American Standard',
        sticker: [
            'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltabd0f0c722300da6/633899aefe0f681f308bf509/Lionel_Messi_PSG_2022-23.jpg?auto=webp&fit=crop&format=jpg&height=800&quality=60&width=1200',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltabd0f0c722300da6/633899aefe0f681f308bf509/Lionel_Messi_PSG_2022-23.jpg?auto=webp&fit=crop&format=jpg&height=800&quality=60&width=1200',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://media.cnn.com/api/v1/images/stellar/prod/220530124443-02-paris-saint-germain-lionel-messi-052122-restricted.jpg?c=original',
            'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt344a7ca1d67d255b/634afc9d4599c772d4e15f4e/GettyImages-1433370684.jpg',
            'https://wallpaperaccess.com/full/317501.jpg',
            'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltabd0f0c722300da6/633899aefe0f681f308bf509/Lionel_Messi_PSG_2022-23.jpg?auto=webp&fit=crop&format=jpg&height=800&quality=60&width=1200',
        ],
    },
];

const StickersModal = (props) => {
    const [selected, setSelected] = useState(0);
    const [stickers, setStickers] = useState(stickerSet);

    return (
        <View
            style={[
                styles.container,
                props.showSticker ? styles.show : styles.hide,
            ]}
        >
            <View style={styles.content}>
                <StickerList
                    userChat={props.userChat}
                    friendData={props.friendData}
                    style={styles.stickersSet}
                    stickers={stickers[selected].sticker}
                />
                <ScrollView horizontal={true}>
                    <View style={styles.stickerMenu}>
                        {stickers.map((e, i) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelected(i);
                                    }}
                                    style={[
                                        styles.menuItem,
                                        selected === i ? styles.active : styles.default,
                                    ]}
                                    key={i}
                                >
                                    <Text>{e.type}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 10000000000,
        position: 'absolute',
        bottom: '30%',
        width: '80%',
        height: 300,
        backgroundColor: color.white,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: color.lightGrey,
        overflow: 'scroll',

        //shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2.62,
        elevation: 4,
    },
    show: {
        display: 'flex',
    },
    hide: {
        display: 'none',
    },

    content: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
    },
    stickersSet: {
        width: '100%',
        height: 260,
        backgroundColor: color.white,
    },
    stickerMenu: {
        paddingLeft: 10,
        paddingBottom: 9,
        overflow: 'scroll',
        width: '100%',
        height: 40,
        backgroundColor: color.white,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    menuItem: {
        borderRadius: 15,
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    default: {},
    active: {
        borderWidth: 2,
        borderColor: color.lightBlue,
    },
});

export default StickersModal;
