import React from 'react';
// imported from chakra UI
import { Box, Image } from '@chakra-ui/react'

function Hello() {
  const message = 'Hello world! I am a React Component';
  return (
    <div className="container">
      {/* <h2>{message}</h2> */}
      <Box bg='tomato' w='100%' p={4} color='white'>
        <Image
          boxSize='60px'
          src='https://i.postimg.cc/TPXj84Sc/bee.png'
          alt='Dan Abramov'
        />
        Bee MyFriend
      </Box>
    </div>
  );
}

export default Hello;