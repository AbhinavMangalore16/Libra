import { useState } from "react";
import Image from "next/image";

interface NothingWhatSoEverProps {
  label: string;
}

export const NothingWhatSoEver = ({ label }: NothingWhatSoEverProps) => {
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
          src="/nothing-here.png"
        />
        <Image
          alt="Domain Expansion: Infinite Void"
          fill
          className={`absolute top-0 left-0 transition-opacity duration-300 ease-in-out ${isHovered ? "opacity-100" : "opacity-0"}`}
          src="/qr-code-easter-egg.png"
        />
      </div>
      <div className="text-muted-foreground text-base text-center">
        {label}
      </div>
    </div>
  );
};