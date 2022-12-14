import React from 'react';
import { Image } from '@chakra-ui/react'

import {
  Box,
  Heading,
  Container,
  Link,
  Text,
  Flex,
  Button,
  Stack,
} from '@chakra-ui/react';

function Home() {
  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Find your next best friend. <br />
            <Text as={'span'} color={'orange.400'}>
            Bee My Friend
            </Text>
          </Heading>
          <Flex flex={1}>
          <Image
            alt={'Landing Page Image'}
            imageAlign={'center'}
            objectFit={'cover'}
            borderRadius='full'
            src={
              'https://images.unsplash.com/photo-1629713014426-156da15c7571?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
            }
          />
        </Flex>
          <Text color={'gray.500'}>
            Insert copy about Bee My Friend Here. Insert copy about Bee My Friend Here.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button
              colorScheme={'green'}
              bg={'tomato'}
              rounded={'full'}
              px={40}
              _hover={{
                bg: 'gray.500',
              }}>
             <Link href='/login'> Login </Link>
            </Button>
            <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
              <Link href='/signup'>
              Not yet registered? Sign up today!
              </Link>
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Home;