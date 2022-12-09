// import statement for Chakra UI components
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Hello from './components/Hello';
import Profile from './components/Profile';
import PlacementExample from './components/ProfileMenu'
import { Logo } from './Logo';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Hello />
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            {/* <Logo h="40vmin" pointerEvents="none" /> */}
            {/* <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text> */}
            {/* <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link> */}
            {/* <Box as='button' borderRadius='md' bg='tomato' color='white' px={4} h={8}>
              Button
            </Box> */}
            <Profile />
            <PlacementExample />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;