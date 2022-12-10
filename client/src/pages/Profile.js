import React from 'react';
// imported from chakra UI
import { Box, Image, List, ListItem, ListIcon, Container } from '@chakra-ui/react';
import { Divider, Stack } from '@chakra-ui/react'


function Profile() {
  // const message = 'Hello world! I am a React Component';
  return (
    <div className="container">
      {/* <h2>{message}</h2> */}
      <Box bg='tomato' w='100%' p={4} color='white'>
        Username
      </Box>
      <Stack direction='row' h='100px' p={4}>
        <Divider />
      </Stack>
      <Image
        borderRadius='full'
        boxSize='110px'
        src='https://i.postimg.cc/XvLKcvPM/avat.jpg'
        alt='Dan Abramov'
      />
            <Stack direction='row' h='100px' p={4}>
        <Divider />
      </Stack>
      <Box bg='tomato' w='100%' p={4} color='white'>
        Bio
      </Box>
      
      <Container>
        There are many benefits to a joint design and development system. Not only
        does it bring benefits to the design team, but it also brings benefits to
        engineering teams. It makes sure that our experiences have a consistent look
        and feel, not just in our design specs, but in production
      </Container>
      <Stack direction='row' h='100px' p={4}>
        <Divider />
      </Stack>
      <List spacing={3}>
        <ListItem>
          <ListIcon color='green.500' />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </ListItem>
        <ListItem>
          <ListIcon color='green.500' />
          Assumenda, quia temporibus eveniet a libero incidunt suscipit
        </ListItem>
        <ListItem>
          <ListIcon color='green.500' />
          Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
        </ListItem>
        {/* You can also use custom icons from react-icons */}
        <ListItem>
          <ListIcon color='green.500' />
          Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
        </ListItem>
      </List>
    </div>
  );
}

export default Profile;
