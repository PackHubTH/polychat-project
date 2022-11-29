import { useState } from 'react';
import { Box, Button, Center, FormControl, Heading, HStack, Icon, Image, Input, Link, MaterialIcons, Pressable, Text, VStack } from 'native-base';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import Logo from '../../../assets/logo.png';
import { auth } from '../../utils/auth/FirebaseAuth';
import { returnAuthContext } from '../../utils/auth/AuthContext';

const Register = ({ navigation, route }) => {

    //Form Data
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [confirmPassword, setConfirmPwd] = useState('');

    //Error
    const [formError, setFormError] = useState({});
    const [error, setError] = useState({});

    const { register } = returnAuthContext();

    const validate = () => {

        if (firstname == '' | lastname == '' | displayName == '') {
            setFormError({
                ...formError, name: 'Please fill in all names in a required fields!'
            });
            return false;
        }

        if (phoneNum == '') {
            setFormError({
                ...formError, name: 'Please fill in your phone number!'
            });
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(regEmail)) {
            setFormError({
                ...formError, name: 'Invalid email address'
            });
            return false;
        }

        if (regEmail == '') {
            setFormError({
                ...formError, name: 'Email is required!'
            });
            return false;
        }

        if (regPassword == '') {
            setFormError({
                ...formError, name: 'Please create your password!'
            });
            return false;
        }

        if (regPassword.length < 6) {
            setFormError({
                ...formError, name: 'Password must consist of more than 6 characters!'
            });
            return false;
        }

        if (confirmPassword == '') {
            setFormError({
                ...formError, name: 'Please confirm your password!'
            });
            return false;
        }

        if (regPassword != confirmPassword) {
            setFormError({
                ...formError, name: 'Both password field does not match!'
            });
            return false;
        }

        return true;
    };

    const submit = () => {
        try {
            if (validate()) {
                register(regEmail, regPassword, phoneNum, displayName, firstname, lastname);
                console.log('Submitted!');
                return true;
            }
            else {
                console.log('Invalid Input');
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    return (
        <Center safeArea flex={1} bg='#fff'>
            <Image source={Logo} alt="Alternate Text" w="192" h="160" />
            <VStack space={3} mt="1" alignItems="center">
                <FormControl isInvalid={'name' in formError}>
                    <Text bold fontSize={18}>CREATE ACCOUNT</Text>

                    <FormControl.Label isRequired>First Name</FormControl.Label>
                    <Input placeholder="Email" variant='rounded' w="286"
                        onChangeText={(event) => setFirstname(event)}
                    />

                    <FormControl.Label isRequired>Last Name</FormControl.Label>
                    <Input placeholder="Email" variant='rounded' w="286"
                        onChangeText={(event) => setLastname(event)}
                    />

                    <FormControl.Label isRequired>Display Name</FormControl.Label>
                    <Input placeholder="Email" variant='rounded' w="286"
                        onChangeText={(event) => setDisplayName(event)}
                    />
                    <FormControl.HelperText>** This name will be display as your profile!</FormControl.HelperText>

                    <FormControl.Label isRequired>Phone Number</FormControl.Label>
                    <Input placeholder="Email" variant='rounded' w="286"
                        onChangeText={(event) => setPhoneNum(event)}
                    />

                    <FormControl.Label isRequired>Email Address</FormControl.Label>
                    <Input placeholder="Email" variant='rounded' w="286"
                        onChangeText={(event) => setRegEmail(event)}
                    />

                    <FormControl.Label isRequired>Password</FormControl.Label>
                    <Input placeholder="Password" variant='rounded' type="password" w="286"
                        onChangeText={(event) => setRegPassword(event)}
                    />

                    <FormControl.Label isRequired>Confirm Password</FormControl.Label>
                    <Input placeholder="Password" variant='rounded' type="password" w="286"
                        onChangeText={(event) => setConfirmPwd(event)}
                    />

                    <Button w="286" borderRadius="20" mt="2" colorScheme="indigo"
                        onPress={() => {
                            if (submit()) {
                                navigation.navigate('Login');
                            }
                        }}>
                        Register
                    </Button>
                    {
                        'name' in formError ? <FormControl.ErrorMessage>{formError.name}</FormControl.ErrorMessage> :
                            <FormControl.HelperText>Please input your email and password for registration</FormControl.HelperText>
                    }
                </FormControl>

                <HStack>
                    <Text fontSize="sm" color="coolGray.600"
                        _dark={{ color: 'warmGray.200' }} >
                        Click here to go back to {' '}
                        <Link _text={{
                            color: 'indigo.500',
                            fontWeight: 'medium',
                            fontSize: 'sm'
                        }} onPress={() => navigation.navigate('LoginPage')}>
                            Login Page
                        </Link>

                    </Text>
                </HStack>
            </VStack>
        </Center>
    );
};

export default Register;