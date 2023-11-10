import Image from 'next/image';
import Input from '../../../components/Input';
import SubmitButton from '../../../components/Button/SubmitButton';

import notepad from '@/public/images/sliderIcons/pen.svg';

export default function Prompt() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-10">
      <div className="flex flex-col items-center space-y-5">
        <p className="text-white text-xl">Write a quirky sentence:</p>
        <Image
          src={notepad}
          alt="notepad"
          height={100}
          width={100}
          priority={true}
        />
        <Input />
        <SubmitButton />
      </div>
    </main>
  );
}
