import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface SafetyRatingProp {
  category: string;
  probability: string;
}

if (!process.env.GOOGLE_GENERATIVE_AI_KEY) {
  throw new Error("GOOGLE_GENERATIVE_AI_KEY environment variable is not set");
}


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_KEY);
const customPrefixPrompt = "Write the answer response to the prompt strictly as a markdown code snippet. Use comments for explanations. You can give a bigger explanation to the code after the markdown code. Here is the prompt:"

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    if (!genAI.apiKey) {
      return new NextResponse("Google Generative AI API key not configured!", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
    const mainPrompt = customPrefixPrompt + prompt;
    const result = await model.generateContent(mainPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });

  } catch (error: unknown) {
    console.log("[GENERATIVE_AI_ERROR]", error);
    if (error instanceof Error) {
      return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}