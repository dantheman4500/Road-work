import axios from 'axios';
import { useEffect, useState } from 'react';
import { socket } from '../../socket';
import ChatInfo from './ChatInfo';
import ChatSection from './ChatSection';
import ChatSidebar from './ChatSidebar';

const ChatMain = ({ user }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState();
    useEffect(() => {
        const getConv = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/conversation/${user.id}`);
                setConversations(res.data);
            }
            catch (error) { }
        };
        getConv();
    }, []);
    useEffect(() => {
        socket.on('test2', (data) => {
            alert(data.message);
        });
    }, [socket]);
    return (
        <div className="mx-auto grid max-h-[91vh] grid-cols-12 overflow-hidden">
          <ChatSidebar
            user={user}
            isChatOpen={isChatOpen}
            setIsChatOpen={setIsChatOpen}
            conversations={conversations}
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
          />
          <ChatSection
            isChatOpen={isChatOpen}
            setIsChatOpen={setIsChatOpen}
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
          />
          <ChatInfo user={user} conv={conversations} />
        </div>
      )
    }
 
    export default ChatMain
