// Import React, hooks, mutations, etc. for signUp page. 
import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
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
  Text
} from '@chakra-ui/react';

// Signup props and logic for sign-up
const SignUp = (props) => {
  const [formState, setFormState] = useState(
    {
      email: '',
      password: '',
    });

  const [createProfile] = useMutation(ADD_USER);

  const [userInterest, setUserInterest] = useState({
    interests: [],
    options: []
  })

  // Signup logic to submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await createProfile({
      variables: {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        password: formState.password,
        userBio: formState.userBio,
        interests: userInterest.interests
      },
    });
    console.log("test")
    // Logic to authenticate user login
    const token = mutationResponse.data.createProfile.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleCheckboxes = (e) => {
    const { value, checked } = e.target;
    const { interests } = userInterest;
    console.log(`${value} is ${checked}`);
    if (checked) {
      setUserInterest({
        interests: [...interests, value],
        options: [...interests, value],
      });
    }
    else {
      setUserInterest({
        interests: interests.filter((e) => e !== value),
        options: interests.filter((e) => e !== value),
      });
    }
    console.log(interests)
  }

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
            <form onSubmit={handleFormSubmit}>
              <FormControl id="firstName">
                <FormLabel>First name</FormLabel>
                <Input
                  name="firstName"
                  type="firstName"
                  value={formState.firstName}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input
                  name="lastName"
                  type="lastName"
                  value={formState.lastName}
                  onChange={handleChange}
                />
              </FormControl>
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
                <Input type="password"
                  name='password'
                  placeholder='**********'
                  onChange={handleChange} />
              </FormControl>
              <Stack spacing={10}>
                <FormControl spacing={5}>
                  <FormLabel>What interests you?</FormLabel>
                  <Stack spacing={5} direction='row'>
                    <Checkbox colorScheme='orange' defaultunChecked textTransform={'uppercase'} onChange={handleCheckboxes} name="interests" type="checkbox" value="food">
                      food
                    </Checkbox>
                    <Checkbox colorScheme='orange' defaultunChecked textTransform={'uppercase'} onChange={handleCheckboxes} name="interests" value="travel" type="checkbox">
                      travel
                    </Checkbox>
                    <Checkbox colorScheme='orange' defaultunChecked textTransform={'uppercase'} onChange={handleCheckboxes} name="interests" value="games" type="checkbox">
                      games
                    </Checkbox>
                    <Checkbox colorScheme='orange' defaultunChecked textTransform={'uppercase'} onChange={handleCheckboxes} name="options" value="reading" type="checkbox">
                      reading
                    </Checkbox>
                  </Stack>
                  <Stack spacing={5} direction='row'>
                    <Checkbox colorScheme='orange' defaultunChecked textTransform={'uppercase'} onChange={handleCheckboxes} name="options" value="art" type="checkbox">
                      art
                    </Checkbox>
                    <Checkbox colorScheme='orange' defaultunChecked textTransform={'uppercase'} onChange={handleCheckboxes} name="options" value="computers" type="checkbox">
                      computers
                    </Checkbox>
                    <Checkbox colorScheme='orange' defaultunChecked textTransform={'uppercase'} onChange={handleCheckboxes} name="options" value="sports" type="checkbox">
                      sports
                    </Checkbox>
                    <Checkbox colorScheme='orange' defaultunChecked textTransform={'uppercase'} onChange={handleCheckboxes} name="options" value="coding" type="checkbox">
                      coding
                    </Checkbox>
                  </Stack>
                </FormControl>
                <FormControl id="userBio">
                  <Stack spacing={3}>
                    <FormLabel>Tell us a little about yourself...</FormLabel>
                    <Input
                      size='lg'
                      type="userBio"
                      name="userBio"
                      value={formState.userBio}
                      placeholder="I love bees because they are such hard workers!!"
                      onChange={handleChange}
                    />
                  </Stack>
                </FormControl>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox colorScheme={'orange'}>Remember me</Checkbox>
                </Stack>
                <Button
                  bg='tomato'
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
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex >
  );
};

export default SignUp;