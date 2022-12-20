import { GET_CONVERSATIONS_OF_A_USER ,  GET_FRIEND_REQUESTS, GET_USER_BY_ID, GET_USERS} from '../utils/queries'

const {request} = require( 'graphql-request')

const GRAPHQL_ENDPOINT = 'http://localhost:4000/api';

export const getUsers = async () => {
    const results = await request(GRAPHQL_ENDPOINT, GET_USERS);
    return results.Profile;
};
export const getUserById = async (id) => {
    const results = await request(GRAPHQL_ENDPOINT, GET_USER_BY_ID, { id });
    return results.userById;
};

export const getFriendRequests = async (id) => {
    const results = await request(GRAPHQL_ENDPOINT, GET_FRIEND_REQUESTS, { id });
    return results.userById.user.friendRequests;
};
export const getConversationsOfAUser = async (id) => {
    const results = await request(GRAPHQL_ENDPOINT, GET_CONVERSATIONS_OF_A_USER, {
        id,
    });
    return results.getConversations;
};
