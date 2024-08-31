"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_LIMIT } from "@/constants";

interface APICounterProps {
  apiLimitCount: number;
}

export const APICounter = ({ apiLimitCount = 0 }: APICounterProps) => {
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
    <div className="px-4 py-4">
      <Card className="bg-gradient-to-br from-[#2a2a40] via-[#3e3e5a] to-[#1a1a2e] border border-[#252540] shadow-lg rounded-lg">
        <CardContent className="py-8 px-6">
          <div className="text-center text-white mb-6">
            <h3 className="text-lg font-semibold">API Usage</h3>
            <p className="text-sm text-gray-300">{apiLimitCount} out of {MAX_FREE_LIMIT} requests used</p>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-gray-300/20">
              <div
                style={{ width: `${percentageUsed}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#FF9A8B] rounded"
              ></div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-300">
            {percentageUsed < 100 ? (
              <p className="font-medium">You have {MAX_FREE_LIMIT - apiLimitCount} free requests left!</p>
            ) : (
              <p className="font-medium text-red-400">You have reached your free request limit!</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
