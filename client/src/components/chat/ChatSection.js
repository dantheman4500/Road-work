import React, { useEffect, useRef, useState, } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { IoMdPhotos } from 'react-icons/io';
import axios from 'axios';
import MessageCard from './MessageCard';
import Loading from '../Loading';
import {socket}  from '../../socket';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/activities/userRedux';
const ChatSection = ({ isChatOpen, setIsChatOpen, currentChat }) => {
    const [messages, setMessages] = useState([]);
    const [msgInput, setMsgInput] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState({
        sender: '',
        text: '',
        createdAt: 0,
    });
    const currentUser = useSelector(selectCurrentUser);
    const scrollRef = useRef(null);
    useEffect(() => {
        socket.on('getMessage', (data) => {
            setMessages((prev) => [...prev, data]);
        });
    }, [{socket}]);
    useEffect(() => {
        socket.emit('addUser', currentUser?.id);
    }, [currentUser?.id, socket]);
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/message/${currentChat?._id}`);
                setMessages(res.data);
            }
            catch (error) {
                console.log(error);
            }
        };
        getMessages();
    }, [currentChat]);
    const receiverId = currentChat?.members.find((m) => m !== currentUser?.id);
   
    async function handleMessage(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            try {
                const message = {
                    conversationId: currentChat?._id,
                    sender: currentUser?.id,
                    text: msgInput,
                };

                const receiverId = currentChat?.members.find(
                    (m) => m !== currentUser?.id
                );

                await socket.emit('sendMessage', {
                    conversationId: currentChat?._id,
                    sender: currentUser?.id,
                    receiverId,
                    text: msgInput,
                    createdAt: Date.now(),
                });

                const res = await axios.post(
                    'http://localhost:3001/api/message/',
                    message
                );
                setMessages([...messages, res.data]);
                setMsgInput('');
            } catch (error) { }
        }
    }
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    if (!messages) {
        return <Loading />;
    }
    const socketTest = () => {
        socket.emit('test', { message: 'Hello' });
    };
    return (<>
      {isChatOpen ? (<>
          <div className={isChatOpen
                ? 'col-span-12 flex max-h-[91vh] flex-col font-Inter transition-all duration-300 ease-in-out md:col-span-6'
                : 'hidden max-h-[91vh] flex-col font-Inter transition-all duration-300 ease-in-out md:col-span-6 md:inline-flex'}>

            {/* Chats */}
            <div className="flex-[0.90] overflow-y-scroll border-x bg-white">
              {messages?.map((m) => (<div ref={scrollRef} key={m._id}>
                  <MessageCard message={m} receiverId={receiverId}/>
                </div>))}
            </div>

            {/* Chat Footer */}
            <div className="flex flex-[0.1] items-center justify-between border-gray-300 bg-white">
              <IoMdPhotos size={30} color="#FF8080" className="ml-2"/>
              <input type="text" placeholder="Type your message.." className="mx-3 flex-1 rounded-full bg-gray-200 p-2 outline-none" value={msgInput} onChange={(e) => setMsgInput(e.target.value)} onKeyPress={handleMessage}/>
              <RiSendPlaneFill size={40} color="#FF8080" onClick={socketTest} className="mr-2 rounded-full bg-gray-300 p-2 hover:bg-gray-400"/>
            </div>
          </div>
        </>) : (<div className="hidden max-h-[91vh] items-center justify-center font-Inter md:col-span-6 md:inline-flex">
          <span className="text-3xl font-bold italic ">
            Tap on chat to start messaging
          </span>
        </div>)}
    </>);
};
export default ChatSection;