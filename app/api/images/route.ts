import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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
        console.log(prompt);
        console.log(amount);
        console.log(resolution);
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
        const data = await response.json();
        const imageURLs = data.map((img: { asset_url: string }) => img.asset_url);
        return NextResponse.json(imageURLs);
    } catch (error: unknown){
        if (error instanceof Error) {
            return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
        }
        return new NextResponse("Internal Error", { status: 500 });
    }
}