"use client";

import HomeStartButton from "./components/Button/HomeStartButton";
import AvatarSlider from "./components/AvatarSlider/AvatarSlider";
import InstructionsSlider from "./components/InstructionsSlider/InstructionsSlider";
import Input from "./components/Input";
import { useState } from "react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stateUsername, setStateUsername] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-10">
      <InstructionsSlider />
      <AvatarSlider setCurrentSlide={setCurrentSlide} />
      <Input setStateUsername={setStateUsername}/>
      <HomeStartButton currentSlide={currentSlide} stateUsername={stateUsername} />
    </main>
  );
}
