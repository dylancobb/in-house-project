import React from 'react';
import InviteButton from '../../../components/Button/InviteButton';
import UserProfile from '../../../components/UserProfile';

export default function lobby() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-10">
      <h1>Lobby</h1>
      <UserProfile />
      <InviteButton />
    </main>
  );
}