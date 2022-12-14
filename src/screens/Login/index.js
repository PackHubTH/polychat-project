import { useState } from 'react';
import {
    Button,
    Center,
    FormControl,
    HStack,
    Image,
    Input,
    Link,
    Text,
    VStack,
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet } from 'react-native';

import Logo from '../../../assets/logo.png';
import { returnAuthContext } from '../../utils/auth/AuthContext';

const Login = ({ navigation }) => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [formError, setFormError] = useState({});
    const { login } = returnAuthContext();

    //Validate Input Field
    const validate = (errorMessage) => {
        //User not Found
        if (errorMessage.match(/user-not-found/)) {
            setFormError({
                ...formError,
                name: 'Sorry, that email doesn\'t match any account.',
            });
        }

        //Wrong Password
        if (errorMessage.match(/wrong-password/)) {
            setFormError({
                ...formError,
                name: 'Invalid email or password. Try again.',
            });
        }
    };

    //Submit Login
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
            <Center flex={1} bg="#fff">
                <Image source={Logo} alt="Alternate Text" w="192" h="160" />

                <VStack space={3} mt="5" alignItems="center">
                    <FormControl isRequired isInvalid={'name' in formError}>
                        <FormControl.Label>Email address</FormControl.Label>
                        <Input
                            placeholder="Email address"
                            variant="rounded"
                            w="286"
                            onChangeText={(event) => setLoginEmail(event)}
                        />

                        <FormControl.Label isRequired>Password</FormControl.Label>
                        <Input
                            placeholder="Password"
                            variant="rounded"
                            type="password"
                            w="286"
                            onChangeText={(event) => setLoginPassword(event)}
                        />
                        <Link
                            _text={{
                                fontSize: 'xs',
                                fontWeight: '500',
                                color: 'indigo.500',
                            }}
                            alignSelf="flex-end"
                            mt="1"
                        >
                     Forget Password?
                        </Link>
                        {'name' in formError ? (
                            <FormControl.ErrorMessage alignItems="center">
                                {formError.name}
                            </FormControl.ErrorMessage>
                        ) : (
                            <FormControl.HelperText>
                        Please insert your email address and password
                            </FormControl.HelperText>
                        )}
                    </FormControl>
                    <Button
                        w="286"
                        borderRadius="20"
                        mt="2"
                        colorScheme="indigo"
                        onPress={() => {
                            handleLogin();
                        }}
                    >
                  Sign in
                    </Button>

                    <HStack mt="6" justifyContent="center">
                        <Text
                            fontSize="sm"
                            color="coolGray.600"
                            _dark={{
                                color: 'warmGray.200',
                            }}
                        >
                     If you don't have an account, click{' '}
                        </Text>
                        <Link
                            _text={{
                                color: 'indigo.500',
                                fontWeight: 'medium',
                                fontSize: 'sm',
                            }}
                            onPress={() => {
                                navigation.navigate('Register');
                            }}
                        >
                     Create Account
                        </Link>
                    </HStack>
                </VStack>
            </Center>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
    },
});

export default Login;
