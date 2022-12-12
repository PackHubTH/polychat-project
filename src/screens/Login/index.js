import { useState } from 'react';
import { Box, Button, Center, FormControl, Heading, HStack, Icon, Image, Input, Link, MaterialIcons, Pressable, Text, VStack } from 'native-base';
import Auth, { signInWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dimensions, StyleSheet } from 'react-native';

import Logo from '../../../assets/logo.png';
import { auth } from '../../utils/auth/FirebaseAuth';
import { returnAuthContext } from '../../utils/auth/AuthContext';

const Login = ({ navigation, route }) => {

    const [show, setShow] = useState(false);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [formError, setFormError] = useState({});
    const { login } = returnAuthContext();

    const validate = (errorMessage) => {
        if (errorMessage.match(/user-not-found/)) {
            setFormError({ ...formError, name: 'Sorry, that email doesn\'t match any account.' });
        }

        if (errorMessage.match(/wrong-password/)) {
            setFormError({ ...formError, name: 'Invalid email or password. Try again.' });
        }
    };

    const handleLogin = async () => {
        try {
            await login(loginEmail, loginPassword);
            navigation.navigate('Home');
            console.log('Login Successful');
        } catch (error) {
            validate(error.message);
            console.log(error.message);
        }
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <Center flex={1} bg='#fff'>
                {/* <Box p="2" py="8" w="90%" maxW="286"> */}
                {/* <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
        Welcome to PolyChad
      </Heading> */}

                <Image source={Logo} alt="Alternate Text" w="192" h="160" />

                <VStack space={3} mt="5" alignItems="center">
                    <FormControl isRequired isInvalid={'name' in formError}>

                        <FormControl.Label>Email ID</FormControl.Label>
                        <Input placeholder="Email" variant='rounded' w="286"
                            onChangeText={(event) => setLoginEmail(event)}
                        />

                        <FormControl.Label isRequired>Password</FormControl.Label>
                        <Input placeholder="Password" variant='rounded' type="password" w="286"
                            onChangeText={(event) => setLoginPassword(event)}
                        />
                        <Link _text={{
                            fontSize: 'xs',
                            fontWeight: '500',
                            color: 'indigo.500'
                        }} alignSelf="flex-end" mt="1">
              Forget Password?
                        </Link>
                        {
                            'name' in formError ? <FormControl.ErrorMessage alignItems="center">{formError.name}</FormControl.ErrorMessage> :
                                <FormControl.HelperText>Please insert your email address and password</FormControl.HelperText>
                        }
                    </FormControl>
                    <Button w="286" borderRadius="20" mt="2" colorScheme="indigo"
                        onPress={() => {
                            handleLogin();
                        }}>
            Sign in
                    </Button>

                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color="coolGray.600" _dark={{
                            color: 'warmGray.200'
                        }}>
              If you don't have an account, click{' '}
                        </Text>
                        <Link _text={{
                            color: 'indigo.500',
                            fontWeight: 'medium',
                            fontSize: 'sm'
                        }} onPress={() => {
                            navigation.navigate('Register');
                        }}>
              Create Account
                        </Link>
                    </HStack>
                </VStack>
                {/* </Box> */}
            </Center>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
    }
});

export default Login;