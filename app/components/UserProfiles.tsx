import Image from 'next/image'

interface UserProfilesProps {
  gameItem: {
    game_id: number
    game_state: string
    game_stats: {
      players: any[]
    } | null // Ensure game_stats can be null
  }
}

const UserProfiles: React.FC<UserProfilesProps> = ({ gameItem }) => {
  // Check if gameItem or game_stats is null
  if (!gameItem || !gameItem.game_stats) {
    return <p>Loading...</p> // or some other fallback UI
  }

  const { players } = gameItem.game_stats

  return (
    <>
      <div className='flex flex-col gap-2'>
        {players.map((player) => (
          <div
            key={player.player_id}
            className='flex justify-around items-center p-2'
          >
            <Image
              src={`/images/avatars/avatar${
                parseInt(player.player_avatar) + 1
              }.jpg`}
              width={40}
              height={40}
              alt='userAvatar'
              priority={true}
            />
            <p>{player.player_username}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default UserProfiles
