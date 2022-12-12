import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { color } from '../../../../../Style';
import { Text } from 'native-base';
import StickerList from './StickerList';

const stickerSet = [
   {
      type: 'American-sign',
      sticker: [
         'https://firebasestorage.googleapis.com/v0/b/polychat-6523f.appspot.com/o/stickers%2Famerican-sign%2Famerican-sign%20(1).png?alt=media&token=68b729a1-8b7a-4055-bd80-fc950304ae7c',
         'https://firebasestorage.googleapis.com/v0/b/polychat-6523f.appspot.com/o/stickers%2Famerican-sign%2Famerican-sign%20(2).png?alt=media&token=c8bfefaa-8d32-4ff0-86c0-2bf2d6f32c98',
         'https://firebasestorage.googleapis.com/v0/b/polychat-6523f.appspot.com/o/stickers%2Famerican-sign%2Famerican-sign%20(3).png?alt=media&token=cd1662d7-adf3-48ca-8f4b-abbe278558de',
         'https://firebasestorage.googleapis.com/v0/b/polychat-6523f.appspot.com/o/stickers%2Famerican-sign%2Famerican-sign%20(4).png?alt=media&token=3e810ad0-d71c-4f41-a4ab-5b67089d60e0',
         'https://firebasestorage.googleapis.com/v0/b/polychat-6523f.appspot.com/o/stickers%2Famerican-sign%2Famerican-sign%20(5).png?alt=media&token=94c4762a-115e-414e-b976-8f82250f1db2',
         'https://firebasestorage.googleapis.com/v0/b/polychat-6523f.appspot.com/o/stickers%2Famerican-sign%2Famerican-sign%20(6).png?alt=media&token=219d2577-2dac-4e03-8d62-c11075947b4e',
         'https://firebasestorage.googleapis.com/v0/b/polychat-6523f.appspot.com/o/stickers%2Famerican-sign%2Famerican-sign%20(7).png?alt=media&token=4a460d87-d116-4397-9979-0596c30b6fa7',
         'https://firebasestorage.googleapis.com/v0/b/polychat-6523f.appspot.com/o/stickers%2Famerican-sign%2Famerican-sign%20(8).png?alt=media&token=ec05b09c-6232-417d-bd9b-ed47ada57869',
         'https://firebasestorage.googleapis.com/v0/b/polychat-6523f.appspot.com/o/stickers%2Famerican-sign%2Famerican-sign%20(9).png?alt=media&token=2803d145-15ca-4952-9cdc-c14581e28d00',
         'https://firebasestorage.googleapis.com/v0/b/polychat-6523f.appspot.com/o/stickers%2Famerican-sign%2Famerican-sign-logo.png?alt=media&token=00b062ed-fda0-49db-9062-9db172af3727',
      ],
   },
   {
      type: 'Thai-sign',
      sticker: [
         'https://firebasestorage.googleapis.com/v0/b/polychat-6523f.appspot.com/o/stickers%2Fm-nong%2Fm-nong-sign%20(1).png?alt=media&token=191ab00f-8467-4f89-bb2c-d736e31d3177',
         'https://firebasestorage.googleapis.com/v0/b/polychat-6523f.appspot.com/o/stickers%2Fm-nong%2Fm-nong-sign%20(2).png?alt=media&token=d4b469d5-43e7-4bc3-9cfa-996b563f5b05',
         'https://firebasestorage.googleapis.com/v0/b/polychat-6523f.appspot.com/o/stickers%2Fm-nong%2Fm-nong-sign%20(20).png?alt=media&token=26fd11c2-0cda-44d7-91f7-a01607d0c4f7',
         'https://firebasestorage.googleapis.com/v0/b/polychat-6523f.appspot.com/o/stickers%2Fm-nong%2Fm-nong-sign%20(3).png?alt=media&token=806da0bb-6e5c-42c4-9d4f-2d83f177ec29',
         'https://firebasestorage.googleapis.com/v0/b/polychat-6523f.appspot.com/o/stickers%2Fm-nong%2Fm-nong-sign%20(4).png?alt=media&token=cf3ce403-9ca9-4b22-a646-f42007e7ed9c',
         'https://firebasestorage.googleapis.com/v0/b/polychat-6523f.appspot.com/o/stickers%2Fm-nong%2Fm-nong-sign%20(5).png?alt=media&token=d4f868dc-2904-46b9-91b8-051beb69bbd5',
         'https://firebasestorage.googleapis.com/v0/b/polychat-6523f.appspot.com/o/stickers%2Fm-nong%2Fm-nong-sign%20(6).png?alt=media&token=4daf4a48-ca5d-4eb1-8257-9c01da99ebf0',
         'https://firebasestorage.googleapis.com/v0/b/polychat-6523f.appspot.com/o/stickers%2Fm-nong%2Fm-nong-sign%20(7).png?alt=media&token=73e624c2-b3c4-462a-b239-7b8d608f05e6',
         'https://firebasestorage.googleapis.com/v0/b/polychat-6523f.appspot.com/o/stickers%2Fm-nong%2Fm-nong-sign%20(8).png?alt=media&token=b4b2679d-cac8-4d0f-b137-e0125c1aa1b4',
         'https://firebasestorage.googleapis.com/v0/b/polychat-6523f.appspot.com/o/stickers%2Fm-nong%2Fm-nong-sign%20(9).png?alt=media&token=4a59cd46-0b76-447e-a2a9-f81df62a1bef',
      ],
   },
];

const StickersModal = ({ showSticker, userChat, friendData }) => {
   const [selected, setSelected] = useState(0);
   const stickers = stickerSet;

   return (
      <View style={[styles.container, showSticker ? styles.show : styles.hide]}>
         <View style={styles.content}>
            <StickerList
               userChat={userChat}
               friendData={friendData}
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
