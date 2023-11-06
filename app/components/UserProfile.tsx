import React from 'react';
import avatar1 from '../../public/images/avatars/avatar1.jpg';
import avatar2 from '../../public/images/avatars/avatar2.jpg';
import Image from 'next/image';

// UserProfiles will be displayed through a loop, this is just temporary

const UserProfile = () => {
  return (
    <>
      <div className="flex flex-col gap-2 ">
        <div className="flex justify-around items-center p-2">
          <Image
            key={1}
            src={avatar1}
            width={40}
            height={40}
            alt="userAvatar"
            priority={true}
          />
          <p>User1</p>
        </div>
        <div className="flex w-28 justify-around items-center">
          <Image
            key={2}
            src={avatar2}
            width={40}
            height={40}
            alt="userAvatar"
            priority={true}
          />
          <p>User2</p>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
