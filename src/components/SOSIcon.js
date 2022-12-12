import { TouchableWithoutFeedback } from 'react-native';
import { Button } from 'native-base';
import CircularProgress from 'react-native-circular-progress-indicator';

const SOSIcon = (navigation) => {
    return (
        <TouchableWithoutFeedback>
            <Button
                variant="solid"
                style={{
                    border: '4px solid white',
                    borderRadius: '100%',
                    backgroundColor: '#eb3434',
                    width: 56,
                    height: 56,
                    bottom: 20,
                }}
                onLongPress={() => navigation.navigate('SOS')}
                delayLongPress={2000}
            >
            SOS
            </Button>
        </TouchableWithoutFeedback>
    // <TouchableWithoutFeedback
    //    style={{
    //       bottom: 40,
    //    }}
    // >
    //    <CircularProgress
    //       value={60}
    //       radius={20}
    //       duration={2000}
    //       progressValueColor={'#ecf0f1'}
    //       maxValue={200}
    //       title={'KM/H'}
    //       titleColor={'black'}
    //       titleStyle={{ fontWeight: 'bold' }}
    //    />
    // </TouchableWithoutFeedback>
    );
};

export default SOSIcon;
