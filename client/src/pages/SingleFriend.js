import React from 'react';
import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import FriendList from '../components/FriendList';
import { QUERY_SINGLE_PROFILE } from '../utils/queries';

const SingleFriend = () => {
    const { profileId } = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
        variables: { profileId: profileId },
    });
    console.log(data)
    console.log(profileId)
    const profile = data?.profile || {};

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Center py={6}>
            <Box
                maxW={'320px'}
                w={'full'}
                bg={'orange.300'}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
                <Avatar
                    size={'xl'}
                    src={profile.image}
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
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                {profile.name}
                </Heading>
                <Text
                    textAlign={'center'}
                    color={'white.400'}
                    px={3}>
                    Actress, musician, songwriter and artist. PM for work inquires or{' '}
                    <Link href={'#'} color={'blue.400'}>
                        #tag
                    </Link>{' '}
                    me in your posts
                </Text>

                <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                    {profile.interests.map((interest) => (
                                            <Badge
                                            px={2}
                                            py={1}
                                            bg={'white.800'}
                                            fontWeight={'400'}>
                                            {interest}
                                        </Badge>
                    ))}
                </Stack>

                <Stack mt={8} direction={'row'} spacing={4}>
                    <Button
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        _focus={{
                            bg: 'gray.200',
                        }}>
                        Message
                    </Button>
                    <Button
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        bg={'blue.400'}
                        color={'white'}
                        boxShadow={
                            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                        }
                        _hover={{
                            bg: 'blue.500',
                        }}
                        _focus={{
                            bg: 'blue.500',
                        }}>
                        Add
                    </Button>
                </Stack>
            </Box>
        </Center>



    );
};

export default SingleFriend;

{/* <div>
<h2 className="card-header">
    
    {profile.image}
</h2>
</div> */}
