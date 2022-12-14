import React from 'react';

// imported from chakra UI
import { Box, Image, Text, Center, Link } from '@chakra-ui/react'

function Banner() {
  return (
    <div className="container">
      <Center>
        <Box bg='orange.300' w='90%' p={4} color='white' fontSize={'4xl'} borderRadius='40'>
          <Center>
            <Image
              boxSize='60px'
              src='https://i.postimg.cc/TPXj84Sc/bee.png'
              alt='Bee My Friend Logo'
            />
          </Center>
          <Center>
            <Text color={'black'} as='b' >
              Bee MyFriend
            </Text>
          </Center>
        </Box>

      </Center>
      <Box>
        <Text>
          <Link href='/Profile'> Go To Profile Page *** REMOVE LATER *****
          </Link>
        </Text>
      </Box>
      <Box>
        <Text>
          <Link href='/Home'> Home *** REMOVE LATER *****
          </Link>
        </Text>
      </Box>
      <Box>
        <Text>
          <Link href='/friends'> View all Friends *** REMOVE LATER *****
          </Link>
        </Text>
      </Box>
      <Box>
        <Text>
          <Link href='/Home'> Log Out *** REMOVE LATER *****
          </Link>
        </Text>
      </Box>
            <Box>
        <Text>
          <Link href='/SignUp'> SignUp *** REMOVE LATER *****
          </Link>
        </Text>
      </Box>
    </div>
  );
}

export default Banner;