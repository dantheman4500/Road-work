import React, { useState } from 'react';
import { Input, Button, Text } from '@chakra-ui/react';
// import FriendList from './FriendList';
import { useQuery } from '@apollo/client';
import { QUERY_INTEREST } from '../utils/queries';

function SearchBar({ onSearchSubmit }) {
    const [interest, setInterest] = useState('')
    const submitInterest = (e) => {
        e.preventDefault();
        onSearchSubmit(interest);
        
    };
    // console.log(interest)
    // let interestTerm = interest;
    
    const { loading, data } = useQuery(QUERY_INTEREST, {
        variables: { profileInterest: interest}
    })

    console.log(data)
   
    // let findProfileByInterest;
    // if (data) {
    //     findProfileByInterest = data.findProfileByInteres
    // }
    // const profile = data;
    // console.log(profile)
    // console.log(typeof(myData))
    // console.log(findProfileByInterest)
    // console.log(data.findProfileByInterest[0])
    return (
        <div>
            <form onSubmit={submitInterest}>
                <Input placeholder="Hiking" 
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                />
                {/* <Button>Search</Button> */}
                {/* { console.log(myData)} */}
            </form>
            {/* {profile.map((oneProf) => (
                oneProf.map((testing) => {
                    <Text>({testing.name})</Text>
                })
                    
                ))} */}
        </div>
    )
}

export default SearchBar;