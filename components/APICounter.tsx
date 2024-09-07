"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_LIMIT } from "@/constants";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { usePremium } from "@/hooks/use-premium";

interface APICounterProps {
  apiLimitCount: number;
}

export const APICounter = ({ apiLimitCount = 0 }: APICounterProps) => {
  const premium = usePremium();
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) {
    return null;
  }

  // Calculate the percentage of API usage
  const percentageUsed = Math.min((apiLimitCount / MAX_FREE_LIMIT) * 100, 100);

  return (
    <div className="px-3 py-3">
      <Card className="bg-gradient-to-br from-[#2a2a40] via-[#3e3e5a] to-[#1a1a2e] border border-[#252540] shadow-lg rounded-lg">
        <CardContent className="py-6 px-4">
          <div className="text-center text-white mb-4">
            <h3 className="text-base font-semibold">Free AI generation usage</h3>
            <p className="text-xs text-gray-300">
              {apiLimitCount} out of {MAX_FREE_LIMIT} requests used
            </p>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-3 mb-3 text-xs flex rounded bg-gray-300/20">
              <div
                style={{ width: `${percentageUsed}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded bg-gradient-to-r from-green-400 to-blue-500"
              ></div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-300 mb-3">
            {percentageUsed < 100 ? (
              <p className="font-medium">
                You have {MAX_FREE_LIMIT - apiLimitCount} free requests left!
              </p>
            ) : (
              <p className="font-medium text-red-400">
                You have reached your free request limit!
              </p>
            )}
          </div>
          <Button className="w-full h-8 text-xs py-1" variant="pro" onClick={premium.onOpen}>
            Upgrade to LibraPro
            <Sparkles className="w-3 h-3 ml-1 fill-white"/>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
