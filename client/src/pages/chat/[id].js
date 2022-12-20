import React, { useEffect } from 'react';
import axios from 'axios';
import { getUserById } from '../../services';
import { socket } from '../../socket';

const { Banner } = require('../../components/Banner');
const { ChatMain } = require('../../components/chat');


const Chat = ({ userData: { user, posts, conv } }) => {
    useEffect(() => {
        socket.on('userOnline', (data) => {
            console.log(data);
        });
    }, [socket]);
    return (<div>
      <Banner />
      <ChatMain user={user}/>
      <ChatMain user={user}/>
    </div>);
};
export default Chat;
export const getServerSideProps = async ({ params: { id }, }) => {
    const user = (await getUserById(id)) || [];
    const res = await axios.get(`http://localhost:3001/api/conversation/${id}`);
    const conv = res?.data;
    return {
        props: {
            userData: user,
            conversations: conv,
        },
    };
};