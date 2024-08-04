import { useState } from "react";
import Image from "next/image";

interface NoMusicProps {
  label: string;
}

export const NoMusic = ({ label }: NoMusicProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full p-10 flex flex-col justify-center items-center">
      <div
        className="relative h-72 w-72"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          alt="Nothing is here!"
          fill
          className={`transition-opacity duration-300 ease-in-out ${isHovered ? "opacity-0" : "opacity-100"}`}
          src="/musical-pentagram.png"
        />
        <Image
          alt="John Cage: 4'33"
          fill
          className={`absolute top-0 left-0 transition-opacity duration-300 ease-in-out ${isHovered ? "opacity-100" : "opacity-0"}`}
          src="/qr-code-easter-egg2.png"
        />
      </div>
      <div className="text-muted-foreground text-base text-center">
        {label}
      </div>
    </div>
  );
};