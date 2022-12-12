import { View, StyleSheet } from 'react-native';
import { HStack, Text } from 'native-base';
import { color } from '../../../../Style';
import Receive from '../layouts/Receive';
import TimeChat from '../../../components/TimeChat';

export default function YouMessage({ message, time }) {
   return (
      <Receive>
         <HStack alignItems="flex-end" space={2}>
            <View style={styles.absolute}>
               <Text fontWeight={400} style={styles.message}>
                  {message}
               </Text>
            </View>
            <TimeChat time={new Date(time)} />
         </HStack>
      </Receive>
   );
}

const styles = StyleSheet.create({
   absolute: {
      marginTop: 12,
      minHeight: 32,
      padding: 10,
      maxWidth: '48%',
      backgroundColor: color.lightBlue,
      borderRadius: '8%',
   },
   message: { color: color.white },
});
