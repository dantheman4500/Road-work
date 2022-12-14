import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    Input,
    HStack
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { QUERY_INTEREST } from '../utils/queries';

function SearchBar({ onSearchSubmit }) {
    const [interest, setInterest] = useState('')
    const submitInterest = (e) => {
        e.preventDefault();
        onSearchSubmit(interest);

    };

    const { loading, data } = useQuery(QUERY_INTEREST, {
        variables: { profileInterest: interest }
    })
    const profiles = data?.findProfileByInterest || [];
    return (
        <div>
            <form onSubmit={submitInterest}>
                <Input placeholder="Hiking"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                />
                {profiles &&
                    profiles.map((profile) => (

                        <HStack spacing='20%'>
                        <Center py={1} key={profile._id}>
                            <Box
                                maxW={'270px'}
                                w={'300px'}
                                bg={'orange.300'}
                                boxShadow={'2xl'}
                                rounded={'md'}
                                overflow={'hidden'}>
                                <Image
                                    h={'120px'}
                                    w={'full'}
                                    src={
                                        'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                                    }
                                    objectFit={'cover'}
                                />
                                <Flex justify={'center'} mt={-12}>
                                    <Avatar
                                        size={'xl'}
                                        src={
                                            profile.image
                                        }
                                        alt={'Author'}
                                        css={{
                                            border: '2px solid white',
                                        }}
                                    />
                                </Flex>
                                <Box p={6}>
                                    <Stack spacing={0} align={'center'} mb={5}>
                                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                                            {profile.name}
                                        </Heading>
                                    </Stack>
                                    <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
                                        Interests
                                    </Heading>
                                    <Stack direction={'row'} justify={'center'} spacing={6}>
                                        {profile.interests && profile.interests.map((interest) => (
                                            <Stack spacing={0} align={'center'}>
                                                <Text fontWeight={600}>{interest}</Text>
                                            </Stack>
                                        ))}
                                    </Stack>
                                    <Link
                                        to={`/friends/${profile._id}`}
                                    >
                                        <Button
                                            w={'full'}
                                            mt={8}
                                            bg={'gray.900'}
                                            color={'white'}
                                            rounded={'md'}
                                            _hover={{
                                                transform: 'translateY(-2px)',
                                                boxShadow: 'lg',
                                            }}>
                                            View Profile
                                        </Button>
                                    </Link>
                                </Box>
                            </Box>
                        </Center>
                        </HStack>
                    ))}
            </form>
        </div>
    )
}

export default SearchBar;