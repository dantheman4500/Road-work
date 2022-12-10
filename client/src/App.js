import React from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
import Profile from './pages/Profile';
import Login from "./pages/Login"



const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
      <Hello />
        <Router>
          <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={3}>
              <ColorModeSwitcher justifySelf="flex-end" />
              <VStack spacing={8}>
                  <div className="flex-column justify-flex-start min-100-vh">
                    <div className="container">
                      <Routes>
                        <Route 
                          path="/" 
                          element={<Login/>} 
                        />
                        <Route 
                          path="/login" 
                          element={<Login/>} 
                        />
                        <Route 
                          path="/profile" 
                          element={<Profile/>} 
                        />                      
                      </Routes>
                    </div>
                  </div>
              </VStack>
            </Grid>
          </Box>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;

