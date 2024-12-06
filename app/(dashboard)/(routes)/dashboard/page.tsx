"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Code,
  FileText,
  Images,
  MessageCircleMore,
  Music,
  Video,
} from "lucide-react";
import { useRouter } from "next/navigation";

const features = [
  {
    label: "Chatbot",
    icon: MessageCircleMore,
    color: "text-[#38B2AC]",
    bgcolor: "bg-[#38B2AC]/10",
    href: "/chatbot",
    description: "Have natural conversations with your personal AI assistant - like your own J.A.R.V.I.S, ready to help anytime."
  },
  {
    label: "CodeKraft",
    icon: Code,
    color: "text-[#6c9cfc]",
    bgcolor: "bg-[#6c9cfc]/10",
    href: "/code-gen",
    description: "Effortlessly generate clean, working code snippets tailored to your needs with just a few clicks."
  },
  {
    label: "AskPDF",
    icon: FileText,
    color: "text-[#E4B1F0]",
    bgcolor: "bg-[#E4B1F0]/10",
    href:"/pdf-chatbot",
    description: "Upload a PDF and have a natural conversation with its contents. Perfect for quick answers and deeper insights."
  },
  {
    label: "Visionary",
    icon: Images,
    color: "text-[#7C4DFF]",
    bgcolor: "bg-[#7C4DFF]/10",
    href: "/images",
    description: "Bring your ideas to life by creating stunning, AI-generated images in seconds."
  },
  {
    label: "StoryForge",
    icon: Video,
    color: "text-[#4CAF50]",
    bgcolor: "bg-[#4CAF50]/10",
    href: "/video",
    description: "Turn your vision into reality with AI-powered tools that create captivating videos effortlessly."
  },
  {
    label: "SoundWave",
    icon: Music,
    color: "text-[#F4511E]",
    bgcolor: "bg-[#F4511E]/10",
    href: "/music",
    description: "Compose unique and beautiful music pieces in minutes - no instruments or experience required."
  }
];


const DashboardArea = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-4 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
        The Future of Work Starts Here. Your AI Partner.
        </h2>
        <p className="text-muted-foreground font-light text-sm text-center md:text-lg text-center">
          Where Technology Meets Tomorrow
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {features.map((feature) => (
          <Card
          onClick={()=>
            router.push(feature.href)
          }
            key={feature.href}
            className="flex items-center justify-between p-4 border-black/5 hover:shadow-lg hover:-translate-y-1 transition-transform duration-200 cursor-pointer"
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
