import React from 'react';
// imported from chakra UI
import { Box } from '@chakra-ui/react'

function Hello() {
  const message = 'Hello world! I am a React Component';
  return (
    <div className="container">
      <h2>{message}</h2>
      <Box bg='tomato' w='100%' p={4} color='white'>
        This is the Box
      </Box>
    </div>
  );
}

export default Hello;

