import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { checkFreeExhaust, increaseAPILimit } from "@/lib/limits";

const replicateAI = new Replicate({
  auth: process.env.REPLICATE_AI_API_TOKEN!
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }
    const isFree = await checkFreeExhaust();
    if (!isFree) {
      return new NextResponse(
        "Free trial has ended! Please avail pro version to avail more!",
        { status: 403 }
      );
    }
    const response = await replicateAI.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", { input :{
      prompt: prompt
    } });
    await increaseAPILimit();
    return NextResponse.json(response);
  } catch (error: unknown) {
    console.log("[MUSIC_ERROR]", error);
    return new NextResponse("Internal error:", { status: 500 });
  }
}
