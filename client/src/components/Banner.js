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
              Bee My Friend
            </Text>
          </Center>
        </Box>
{/* These are our future navigation/drop down menu buttons */}
      </Center>
      <Box>
        <Text>
          <Link href='/Profile'> Go To Profile Page 
          </Link>
        </Text>
      </Box>
      <Box>
        <Text>
        <Link href='/profileUpdate'>Edit Profile
        </Link>
        </Text>
      </Box>
      <Box>
        <Text>
        <Link href='/'> Home 
        </Link>
        </Text>
      </Box>
      <Box>
        <Text>
        <Link href='/friends'> View all Friends 
        </Link>
        </Text>
      </Box>
      <Box>
        <Text>
        <Link href='/donate'> Donate 
        </Link>
        </Text>
        </Box>
      <Box>
        <Text>
        <Link href='/Home'> Log Out 
        </Link>
        </Text>
      </Box>
      <Box>
        <Text>
        <Link href='/SignUp'> Sign Up 
        </Link>
        </Text>
      </Box>
    </div>
  );
}

export default Banner;