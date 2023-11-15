import React from 'react'
import Image from 'next/image'
import icon from './arrowBtn.svg'

interface SubmitProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Submit: React.FC<SubmitProps> = ({ onClick }) => {
  return (
    <button className='btn bg-green' onClick={onClick}>
      <Image src={icon} alt='arrow icon' height={40} width={40} />
      SUBMIT
    </button>
  )
}

export default Submit
