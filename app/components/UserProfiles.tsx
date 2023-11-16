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
      <div className='flex flex-col gap-2 w-1/2 max-w-sm'>
        {players.map((player) => (
          <div
            key={player.player_id}
            className='flex justify-around  items-center p-2 border-2 border-solid border-green rounded-md'
          >
            <Image
              src={`/images/avatars/avatar${
                parseInt(player.player_avatar) + 1
              }.jpg`}
              width={60}
              height={60}
              alt='userAvatar'
              priority={true}
              style={{ borderRadius: '50%' }}
            />
            <p>{player.player_username}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default UserProfiles
