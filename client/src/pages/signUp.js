// Import React, hooks, mutations, etc. for signUp page. 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

// Import styling from Chakra UI 
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Image,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react';


// Signup props and logic for sign-up
const SignUp = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  // Signup logic to submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
      },
    });

    // Logic to authenticate user login
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={'dark'}>
        <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'6xl'}>New user?</Heading>
            <Heading fontSize={'5xl'}>Sign Up Today!</Heading> 
            <Text fontSize={'lg'} color={'gray.600'}>
              And let's <a href="/home">Bee friends!</a> 🐝
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={"tomato.300"}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input 
                    name="email"
                    type="email" 
                    value={formState.email}
                    onChange={handleChange}
                    />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                </Stack>
                <Button
                  bg= 'tomato'
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                  >
                  Sign Up!
                </Button>
                <center><Image
              boxSize='60px'
              src='https://i.postimg.cc/TPXj84Sc/bee.png'
              alt='Bee My Friend Logo'
            /></center>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  };

export default SignUp;