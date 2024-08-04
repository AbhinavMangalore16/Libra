import { useState } from "react";
import Image from "next/image";

interface NothingWhatSoEverProps {
  label: string;
  normalImageSrc: string;
  hoverImageSrc: string;
}

export const NothingWhatSoEver = ({ label, normalImageSrc, hoverImageSrc }: NothingWhatSoEverProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full p-10 flex flex-col justify-center items-center">
      <div
        className="relative h-72 w-72"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          alt="Normal view"
          fill
          className={`transition-opacity duration-300 ease-in-out ${isHovered ? "opacity-0" : "opacity-100"}`}
          src={normalImageSrc}
        />
        <Image
          alt="Hover view"
          fill
          className={`absolute top-0 left-0 transition-opacity duration-300 ease-in-out ${isHovered ? "opacity-100" : "opacity-0"}`}
          src={hoverImageSrc}
        />
      </div>
      <div className="text-muted-foreground text-base text-center">
        {label}
      </div>
    </div>
  );
};