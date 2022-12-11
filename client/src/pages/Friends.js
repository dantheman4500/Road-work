import React from 'react';
import { useQuery } from '@apollo/client';
import FriendList from '../components/FriendList';
import { QUERY_PROFILES } from '../utils/queries';

const Friends = () => {
  const { loading, data } = useQuery(QUERY_PROFILES);
  console.log(data)
  const profiles = data?.profiles || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <FriendList
              profiles={profiles}
              title="Meet New Friends!"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Friends;
