import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { checkFreeExhaust, increaseAPILimit } from "@/lib/limits";

export async function POST(req:Request){
    try{
        const { userId } = auth();
        if (!userId){
            return new NextResponse("Unauthorized!", {status: 401});
        }
        const apiKey = process.env.RENGOKU_TOKEN;
        if (!apiKey){
            throw new Error("RENGOKU_TOKEN not set");
        }
        const {prompt, amount, resolution} = await req.json();
        const isFree = await checkFreeExhaust();
        if (!isFree) {
          return new NextResponse(
            "Free trial has ended! Please avail pro version to avail more!",
            { status: 403 }
          );
        }
        const response = await fetch('https://api.limewire.com/api/image/generation',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'X-Api-Version':'v1',
                Accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                prompt, 
                samples: parseInt(amount, 10),
                quality: resolution,
                guidance_scale: 50,
                aspect_ratio:'1:1',
                style: 'PHOTOREALISTIC'
            }),
        });
        if (!response.ok){
            throw new Error(`Error generating image: ${response.statusText}`);
        }
        if (response.status===500){
            throw new Error(`FeatureUnavailable: The feature is currently unavailable: ${response.statusText}`)
        }
        const data = await response.json();
        const imageURLs = data.map((img: { asset_url: string }) => img.asset_url);
        await increaseAPILimit();
        return NextResponse.json(imageURLs);
    } catch (error: unknown){
        if (error instanceof Error) {
            if (error.message.includes("FeatureUnavailable")) {
                console.log(error)
                return new NextResponse(
                    JSON.stringify({ error: "Feature is unavailable", code: 500 }),
                    { status: 500 }
                );
                
            }
            return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
        }
        return new NextResponse("Internal Error", { status: 500 });
    }
}