'use client';

import Image from 'next/image';
import Carousel from 'nuka-carousel';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <Carousel className="min-h-max">
        <div className="flex flex-col items-center justify-between p-2">
          <Image
            priority
            src="images/notepad.svg"
            height={100}
            width={100}
            alt="Write a sentence"
          />
          <p>Each player writes a quirky sentence</p>
        </div>

        <Image
          priority
          src="images/notepad.svg"
          height={100}
          width={100}
          alt="Write a sentence"
        />
      </Carousel>
    </main>
  );
}

function Card() {}
