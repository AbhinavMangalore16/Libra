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
      <Card className="bg-gradient-to-r from-[#000428] via-[#004e92] to-[#1B0037] border-0 shadow-lg rounded-lg">
        <CardContent className="py-8 px-6">
          <div className="text-center text-white mb-6">
            <h3 className="text-lg font-semibold">API Usage</h3>
            <p className="text-sm text-gray-200">{apiLimitCount} out of {MAX_FREE_LIMIT} requests used</p>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${percentageUsed}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#FF5F6D]"
              ></div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-200">
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
