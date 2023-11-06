import React from 'react';
import InviteButton from './Button/InviteButton';
import UserProfile from './UserProfile';

const Lobby = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <h1>Lobby</h1>
      <UserProfile />
      <InviteButton />
    </main>
  );
};

export default Lobby;
