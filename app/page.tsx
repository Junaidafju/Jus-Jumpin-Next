import { AnimatedHeader } from "./components/AnimatedHeader";
import Image from 'next/image';
import HomeHero3D from "./components/HomeHero3D";
import HomeExperience from "./components/HomeExperience";

export default function Home() {
  return (
    <>
      <HomeHero3D />
      <HomeExperience />
      {/* rest of homepage */}
    </>
  );
}
