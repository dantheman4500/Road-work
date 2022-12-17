import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateUser } from '../components/UserProfile';
import { useQuery, useMutation } from '@apollo/client';
// import { USER_UPDATE_REQUEST } from '../utils/actions';
import { QUERY_SINGLE_PROFILE } from '../utils/queries'
import { UPDATE_USER, DELETE_PROFILE, UPDATE_BIO } from '../utils/mutations';
import Auth from '../utils/auth';
// imported from chakra UI
import {
  Box,
  Avatar,
  Link,
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Editable,
  EditableInput,
  EditablePreview
} from '@chakra-ui/react';

const UpdateProfile = (props) => {

  const userId = Auth.getProfile();
  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileId: userId.data._id }
  });

  const profile = data?.profile || {};
  const [removeProfile, { error }] = useMutation(DELETE_PROFILE);

  const handleDeleteProfile = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    const testId = Auth.getProfile();
    //token
    console.log(token);
    //object
    console.log(testId)
    //id
    console.log(testId.data._id)
    if (!token) {
      return false;
    }
    try {
      const mutationResponse = await removeProfile({
        variables: {
          profileId: testId.data._id
        }

      });
    } catch (err) {
      console.error(error);
    }
    Auth.logout();
  };

  const [ userBioText, setUserBioText ] = useState('');
  const [updateBio, { err } ] = useMutation(UPDATE_BIO);
  const handleBioUpdate = async () => {
    try {
      const { data } = await updateBio({
        variables: {
          profileId: profile._id,
          userBio: userBioText
        }
      })
    } catch (err) {
      console.error(err)
    }
  }

  // //Get the user from localstorage and pass to the initial states
  // const userLogin = useSelector(state => state.userLogin);
  // const { userInfo } = userLogin;
  // console.log(userInfo);

  // //dispatch
  // const dispatch = useDispatch();
  //submit
  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   const mutationResponse = await updateUser({
  //     variables: {
  //       email: formState.email,
  //       password: formState.password,
  //       firstName: formState.firstName,
  //       lastName: formState.lastName,
  //     },
  //   });
  //   const token = mutationResponse.data.addUser.token;
  //   Auth.login(token);
  // };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormState({
  //     ...formState,
  //     [name]: value,
  //   });
  // };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text>What would you like to do {profile.firstName}?</Text>
      <Text>Add more interests</Text>
      <Text>Update Bio</Text>
<Editable defaultValue='Take some chakra'>
  <EditablePreview />
  <EditableInput />
</Editable>
      <div>
        <Center>
          <Box bg='orange.400' w='100%' p={4} borderRadius='full'>
            Update Your Profile
          </Box>
        </Center>
        <Stack direction='row' h='5px' p={4}>
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
              {/* <FormControl onSubmit={handleFormSubmit}> */}
              <FormControl>
                <FormLabel>First Name:</FormLabel>
                <Input

                  // onChange={handleChange}
                  className="form-input"
                  placeholder="New First Name"
                  name="firstName"
                  type="firstName"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name:</FormLabel>
                <Input

                  // onChange={handleChange}
                  className="form-input"
                  placeholder="New Last Name"
                  name="lastName"
                  type="lastName"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email:</FormLabel>
                <Input
                  // onChange={handleChange}
                  className="form-input"
                  placeholder="New Email"
                  name="email"
                  type="email"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password:</FormLabel>
                <Input
                  // onChange={handleChange}
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
                  // onChange={handleChange}
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
              <Link to='/Profile'><Button rounded={'full'} type='submit'>
                Save Profile
              </Button></Link>
              {/* Delete button modal */}
              <Button bg={"red.400"} size='lg' onClick={onOpen}>
                DELETE PROFILE
              </Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Delete Profile?</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text>Are you sure you want to delete your profile? All of your data will be permanently removed.</Text>
                  </ModalBody>
                  <ModalFooter>
                    <Button bg={"orange.300"} mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button variant='ghost' bg={"red.400"} onClick={() => handleDeleteProfile()}>Delete profile</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              {/* </Form> */}
            </Stack>
          </Flex>

        </Stack>
      </div>
    </>

  );
}

export default UpdateProfile;
