import React, { useState } from 'react';
import './avatar-styles.css';
import { useKeenSlider, KeenSliderPlugin } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import avatars from '../../../public/images/avatars/images';

interface AppProps {
  setCurrentSlide: (currentSlide: number) => void;
}

export default function App({ setCurrentSlide }: AppProps) {
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="navigation-wrapper">
      <div ref={sliderRef} className="keen-slider">
        {Object.values(avatars).map((avatar, index) => (
          <div key={`div-${index}`} className="keen-slider__slide number-slide">
            <Image
              className="rounded-full"
              src={avatar}
              width={150}
              height={150}
              alt="avatar"
              priority={true}
            />
          </div>
        ))}
      </div>
      {loaded && instanceRef.current && (
        <>
          <Arrow
            left
            onClick={(e: any) => {
              e.stopPropagation() || instanceRef.current?.prev();
            }}
          />

          <Arrow
            onClick={(e: any) => {
              e.stopPropagation() || instanceRef.current?.next();
            }}
          />
        </>
      )}
    </div>
  );
}

function Arrow(props: { left?: boolean; onClick: (e: any) => void }) {
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${props.left ? 'arrow--left' : 'arrow--right'}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
