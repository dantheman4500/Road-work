import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateUser } from '../components/UserProfile';
import { useMutation } from '@apollo/client';
import { USER_UPDATE_REQUEST } from '../utils/actions';
import { UPDATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
// imported from chakra UI
import {
  Box,
  Image,
  Avatar,
  Input,
  FormControl,
  FormLabel,
  Center,
  Divider,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

const UpdateProfile = (props) => {

  const [formState, setFormState] = useState({ 
    firstName: '',
    lastName: '', 
    email: '', 
    password: '' 
  });
  const [updateUser] = useMutation(UPDATE_USER);
  
    // //Get the user from localstorage and pass to the initial states
    // const userLogin = useSelector(state => state.userLogin);
    // const { userInfo } = userLogin;
    // console.log(userInfo);
  
    // //dispatch
    // const dispatch = useDispatch();
    //submit
    const handleFormSubmit = async (event) => {
      event.preventDefault();

      const mutationResponse = await updateUser({
        variables: {
          email: formState.email,
          password: formState.password,
          firstName: formState.firstName,
          lastName: formState.lastName,
        },
      });
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
    <div>
      <Center>
        <Box bg='orange.400' w='80%' p={4} borderRadius='full'>
          Update Your Profile
        </Box>
      </Center>
      <Stack direction='row' h='10px' p={4}>
        <Divider />
      </Stack>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'orange.400',
                  zIndex: -1,
                }}>
                {/* {user.name} */}
                User Name
              </Text>
            </Heading>
        {/* <Form > */}
            <FormControl onSubmit={handleFormSubmit}>
                <FormLabel>First Name:</FormLabel>
                <Input
                    
                    onChange={handleChange}
                    className="form-input"
                    placeholder="New First Name"
                    name="firstName"
                    type="firstName"
                  />
            </FormControl>
            <FormControl>
                <FormLabel>Last Name:</FormLabel>
                <Input
                    
                    onChange={handleChange}
                    className="form-input"
                    placeholder="New Last Name"
                    name="lastName"
                    type="lastName"
                  />
            </FormControl>
            <FormControl>
                <FormLabel>Email:</FormLabel>
                <Input

                    onChange={handleChange}
                    className="form-input"
                    placeholder="New Email"
                    name="email"
                    type="email"
                  />
            </FormControl>
            <FormControl>
                <FormLabel>Password:</FormLabel>
                <Input
                    
                    onChange={handleChange}
                    className="form-input"
                    placeholder="New password"
                    name="password"
                    type="password"
                  />
            </FormControl>
            <FormControl>
                <FormLabel>Avatar:</FormLabel>
                <Avatar
                    size={'xl'}
                    // src={profile.image}
                    onChange={handleChange}
                    alt={'Avatar Alt'}
                    mb={4}
                    pos={'relative'}
                    _after={{
                        content: '""',
                        w: 4,
                        h: 4,
                        bg: 'green.300',
                        border: '2px solid white',
                        rounded: 'full',
                        pos: 'absolute',
                        bottom: 0,
                        right: 3,
                    }}
                />
            </FormControl>
            <Button rounded={'full'} type='submit'>
                Save Profile
            </Button>
        {/* </Form> */}
          </Stack>
        </Flex>
        
      </Stack>
    </div>
  );
}

export default UpdateProfile;