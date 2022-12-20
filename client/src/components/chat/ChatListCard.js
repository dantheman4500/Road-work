import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import client from '../../apollo-client';
import { GET_USER_BY_ID } from '../../utils/queries';
import { selectCurrentUser } from '../../redux/activities/userRedux';
import { socket } from '../../socket';
const ChatListCard = ({ setIsChatOpen, conv, setCurrentChat }) => {
    // const { currentUser } = useStateContext()
    const currentUser = useSelector(selectCurrentUser);
    const [convChats, setConvChats] = useState();
    useEffect(() => {
        const friendId = conv?.members?.find((m) => m !== currentUser?.id);
        const getUser = async () => {
            try {
                const { data } = await client.query({
                    query: GET_USER_BY_ID,
                    variables: {
                        id: friendId,
                    },
                });
                setConvChats(data?.userById?.user);
            }
            catch (error) { }
        };
        getUser();
    }, [currentUser, conv]);
    const setCreds = () => {
        setIsChatOpen(true);
        setCurrentChat(conv);
        socket.emit('addUser', { room: conv?._id });
    };
    return (<div className="m-3 flex flex-1 items-center rounded-md p-2 font-Inter hover:bg-gray-100" onClick={setCreds}>
      <img src={convChats?.profilePic} alt="" className="h-16 w-16 rounded-full object-cover"/>
      <div className="ml-3 flex flex-col">
        <h1 className="font-semibold">{convChats?.name}</h1>
        <p className="text-sm font-light">{convChats?.email}</p>
      </div>
    </div>);
};
export default ChatListCard;
