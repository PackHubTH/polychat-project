import React from "react";
import { Box, Button, Center, FormControl, Heading, HStack, Icon, Image, Input, Link, MaterialIcons, Pressable, Text, VStack } from "native-base";

import { createUserWithEmailAndPassword }  from 'firebase/auth';
import { auth } from '../../dbs/firebase-auth';

const Register = ({navigation, route}) => {

    const [regEmail, setRegEmail] = React.useState("");
    const [regPassword, setRegPassword] = React.useState("");
    const [confirmPassword, setConfirmPwd] = React.useState("");
    const [formError, setError] = React.useState({});

    const register = async () => {
        try {
            console.log(regPassword);
          const user = await createUserWithEmailAndPassword(
            auth, regEmail, regPassword
          );
          console.log(user);
        } catch(error) {
          console.log(error.message);
          throw new Error(`Cannot create account`);
        }
      };

    const validate = () => {
        
        if(!/\S+@\S+\.\S+/.test(regEmail)) {
            setError({
                ...formError, name: "Invalid email address"
            })
            return false;
        }

        if(regEmail == "") {
            setError({
                ...formError, name: "Email is required!"
            })
            return false;
        }

        if(regPassword == "") {
            setError({
                ...formError, name: "Please create your password!"
            })
            return false
        }

        if(regPassword.length < 6) {
            setError({
                ...formError, name: "Password must consist of more than 6 characters!"
            })
            return false;
        }

        if(confirmPassword == "") {
            setError({
                ...formError, name: "Please confirm your password!"
            })
            return false
        }

        if(regPassword != confirmPassword) {
            setError({
                ...formError, name: "Both password field does not match!"
            })
            return false;
        }

        return true;
    }

    const submit = () => {
        if(validate()) {
            console.log("Submitted");
            return true;
        }
        else {
            console.log("Invalid Input");
            return false;
        }
    }

    return(
        <Center safeArea flex={1} bg='#fff'>
            <VStack space={3} mt="1" alignItems="center">
                <FormControl isInvalid={'name' in formError}>
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
                                if(submit()) { 
                                    register()
                                    navigation.navigate('Login') 
                                }
                            }}>
                        Register
                    </Button>

                    {
                        'name' in formError ? <FormControl.ErrorMessage>{ formError.name }</FormControl.ErrorMessage> :
                        <FormControl.HelperText>Please input your email and password for registration</FormControl.HelperText>
                    }

                    
                </FormControl>

                <HStack>
                    <Text fontSize="sm" color="coolGray.600" 
                            _dark={{ color: "warmGray.200"}} > 
                        Click here to go back to {" "}
                        <Link _text={{
                            color: "indigo.500",
                            fontWeight: "medium",
                            fontSize: "sm"
                        }}  onPress={() => navigation.navigate('Login')}>
                            Login Page
                        </Link>

                    </Text>
                </HStack>
            </VStack>
        </Center>
    );
}

export default Register;