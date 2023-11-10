'use client';

import React from 'react';
import UserProfiles from '../../../components/UserProfiles';
import InviteButton from '../../../components/Button/InviteButton';

export default function lobby() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-10">
      <h1>Lobby</h1>
      <UserProfiles />
      <InviteButton />
    </main>
  );
} 