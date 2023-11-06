import React from 'react';
import avatar1 from '../../public/images/avatars/avatar1.jpg';
import avatar2 from '../../public/images/avatars/avatar2.jpg';
import Image from 'next/image';

const UserProfile = () => {
  return (
    <>
      <div>
        <Image key={1} src={avatar1} width={20} height={20} alt="userAvatar" />
        <p>User1</p>

        <Image key={2} src={avatar2} width={20} height={20} alt="userAvatar" />
        <p>User2</p>
      </div>
    </>
  );
};

export default UserProfile;
