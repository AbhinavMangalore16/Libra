import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { checkFreeExhaust, increaseAPILimit } from "@/lib/limits";

const convoHist: Record<string, string[]> = {};

interface SafetyRatingProp {
  category: string;
  probability: string;
}

if (!process.env.GOOGLE_GENERATIVE_AI_KEY) {
  throw new Error("GOOGLE_GENERATIVE_AI_KEY environment variable is not set");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_KEY);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    if (!genAI.apiKey) {
      return new NextResponse("Google Generative AI API key not configured!", {
        status: 500,
      });
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
    if (!convoHist[userId]) {
      convoHist[userId] = [];
    }
    convoHist[userId].push(`User: ${prompt}`);

    if (convoHist[userId].length > 40){
      convoHist[userId].shift(); // user msg
      convoHist[userId].shift(); // AI response
    }

    const convoContext = convoHist[userId].map((line) => line.replace(/^(User:|AI:)\s*/, "")).join("\n"); // sanitizing user and AI prefixes

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Used Gemini 1.5 model
    const result = await model.generateContent(convoContext);
    const response = await result.response;
    const text = response.text();
    convoHist[userId].push(`AI: ${text}`);
    await increaseAPILimit();
    return NextResponse.json({ text });
  } catch (error: unknown) {
    console.log("[GENERATIVE_AI_ERROR]", error);
    if (error instanceof Error) {
      return new NextResponse(`Internal Error: ${error.message}`, {
        status: 500,
      });
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}
