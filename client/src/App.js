import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import statement for Chakra UI components
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
} from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import Banner from './components/Banner';
import Profile from './pages/Profile';
import Login from "./pages/Login"
// import Friends from './pages/Friends';
import SingleFriend from './pages/SingleFriend';
import SearchBar from './components/SearchBar';
import SignUp from './pages/signUp';
import Home from './pages/Home';

const httpLink = createHttpLink({
  uri: '/graphql'
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
        <Banner />
        <Router>
          <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={3}>
              <ColorModeSwitcher justifySelf="flex-end" />
              <VStack spacing={8}>
                  <div className="flex-column justify-flex-start min-100-vh">
                    <div className="container">
                      <Routes>
{/* This first route denotes the loading/landing page */}
                        <Route 
                          path="/" 
                          element={<Home/>} 
                        />
                        <Route 
                          path="/login" 
                          element={<Login/>} 
                        />
                        <Route 
                          path="/profile" 
                          element={<Profile/>} 
                        />
                        <Route 
                          path="/friends" 
                          element={<SearchBar/>} 
                        />
                        <Route 
                          path="/friends/:profileId" 
                          element={<SingleFriend/>} 
                        />
                        <Route 
                          path="/signUp" 
                          element={<SignUp/>} 
                        />
                        <Route 
                          path="/Home" 
                          element={<Home/>} 
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

