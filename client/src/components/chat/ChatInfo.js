import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ChatInfoCard from './ChatinfoCard.js';
const { useStateContext } =require('../../Contex/StateContext');

const ChatInfo = ({ user, conv }) => {
  return (
    <div className="hidden max-h-[91vh] bg-white md:col-span-3 md:inline">
      <div className=" px-3 py-2 font-Inter">
        <h1 className="text-2xl font-bold">Active Users</h1>
      </div>
      <div className="max-h-[83vh] cursor-pointer overflow-y-scroll scrollbar-hide">
        {user.friends.map((u) => (
          <ChatInfoCard key={u.id} friendInfo={u} />
        ))}
      </div>
    </div>
  );
}

export default ChatInfo
