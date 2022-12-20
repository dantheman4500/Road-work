import axios from 'axios';
import { useEffect, useState } from 'react';
import { HiOutlineUserAdd } from 'react-icons/hi'
import { selectCurrentUser } from '../../redux/activities/userRedux';
import { useSelector } from 'react-redux';


const ChatInfoCard = ({ friendInfo }) => {
    const currentUser = useSelector(selectCurrentUser);
    const [myConvs, setMyConvs] = useState([]);
    useEffect(() => {
        const getConvOfUser = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/conversation/${currentUser === null || currentUser === void 0 ? void 0 : currentUser.id}`);
                setMyConvs(res.data);
            }
            catch (error) {
                console.log(error);
            }
        };
        getConvOfUser();
    }, [currentUser === null || currentUser === void 0 ? void 0 : currentUser.id]);
    const abc = myConvs.some((a) => a.members.every((v, i) => v === friendInfo.userId));
    console.log(abc);
    const handleConversation = async () => {
        try {
            const convDetails = {
                senderId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
                receiverId: friendInfo.ProfileId,
            };
            const res = await axios.post('http://localhost:3001/api/conversation/', convDetails);
            console.log(res.data);
        }
        catch (error) {
            console.log(error);
        }
    };
    console.log(myConvs);

    
  return (
    <div
      className="m-3 flex flex-1 items-center rounded-md p-2 font-Inter hover:bg-gray-100"
      onClick={handleConversation}
    >

      <div className="ml-3 flex flex-1 items-center justify-between">
        <div className="flex flex-col items-start">
          <h1 className="font-semibold">{friendInfo.name}</h1>
        </div>
        <div>
          <HiOutlineUserAdd size={25} />
        </div>
      </div>
    </div>
  )
}

    export default ChatInfoCard;