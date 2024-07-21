"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowBigRight,
  ArrowRight,
  Code,
  Icon,
  Images,
  MessageCircle,
  MessageCircleMore,
  Music,
  Video,
} from "lucide-react";

const features = [
  {
    label: "Chatbot",
    icon: MessageCircleMore,
    color: "text-[#38B2AC]",
    bgcolor: "bg-[#38B2AC]/10",
    href: "/chatbot",
    description: "Engage in intelligent conversations with our AI chatbot."
  },
  {
    label: "Code Generator",
    icon: Code,
    color: "text-[#A0D6E2]",
    bgcolor: "bg-[#A0D6E2]/10",
    href: "/code",
    description: "Generate code snippets effortlessly with our AI."
  },
  {
    label: "Image Generator",
    icon: Images,
    color: "text-[#7C4DFF]",
    bgcolor: "bg-[#7C4DFF]/10",
    href: "/images",
    description: "Create stunning images using AI technology."
  },
  {
    label: "Video Generator",
    icon: Video,
    color: "text-[#4CAF50]",
    bgcolor: "bg-[#4CAF50]/10",
    href: "/video",
    description: "Generate captivating videos with AI assistance."
  },
  {
    label: "Music Generator",
    icon: Music,
    color: "text-[#F4511E]",
    bgcolor: "bg-[#F4511E]/10",
    href: "/music",
    description: "Compose beautiful music using AI algorithms."
  },
];

const DashboardArea = () => {
  return (
    <div>
      <div className="mb-4 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          The Future Is AI
        </h2>
        <p className="text-muted-foreground font-light text-sm text-center md:text-lg text-center">
          And We're Leading The Way.
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {features.map((feature) => (
          <Card
            key={feature.href}
            className="flex items-center justify-between p-4 border-black/5 hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", feature.bgcolor)}>
                <feature.icon className={cn("w-8 h-8", feature.color)} />
              </div>
              <div>
                <div className="font-semibold">{feature.label}</div>
                <div className="text-sm text-muted-foreground">
                  {feature.description}
                </div>
              </div>
            </div>
            <ArrowRight className="w-6 h-6" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardArea;
