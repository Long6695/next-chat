'use client';
import { UserType } from '@/types/chat';
import React, { useState } from 'react';
import Drawer from '../drawer';
import CredentialForm from '../login';

const Chat = () => {
  const [auth, setAuth] = useState<UserType | null>(null);

  return (
    <div className="w-full h-screen">
      {auth ? <Drawer auth={auth} /> : <CredentialForm setAuth={setAuth} />}
    </div>
  );
};

export default Chat;
