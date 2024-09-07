"use client";

import { usePremium } from "@/hooks/use-premium";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Check, Code, Images, MessageCircleMore, Music, Sparkle, Video } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

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
    color: "text-[#6c9cfc]",
    bgcolor: "bg-[#6c9cfc]/10",
    href: "/code-gen",
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

export const PremiumModal = () => {
  const premiumModal = usePremium();
  return (
    <Dialog open={premiumModal.open} onOpenChange={premiumModal.onOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col justify-center items-center gap-y-4 pb-4">
            <div className="flex items-center font-bold gap-x-2">
              Upgrade to LibraAI
              <Badge variant="pro">
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 text-slate-700 font-medium">
            {features.map((feature)=>(
              <Card
              key = {feature.label}
              className="flex items-center justify-between p-2 border-black/5"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md")}>
                    <feature.icon className={cn("w-6 h-6", feature.color)}/>
                  </div>
                  <div className="font-semibold text-md">
                    {feature.label}
                  </div>
                </div>
                <Check className="text-primary w-4"/>
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>
            Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};