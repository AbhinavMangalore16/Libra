"use client";
import { cn } from "@/lib/utils";

import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const poppins = Poppins({
    weight: "600",
    subsets: ["latin"]
    
})

const Navbar = () =>{
    return (
        <div className="flex flex-col h-full bg-[#1A1A2E]
        text-white space-y-4 py-4">
            <div className="flex-1 py-2 px-3">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                <div className="relative w-16 h-16 mr-1">
                    <Image fill alt="Libra logo!" src="/libra_logo.png"/>
                </div>
                <h1 className={cn("text-2xl font-bold text-[#D3D3D3]", poppins.className)}>Libra</h1>
                </Link>
            </div>
        </div>
    )
}

export default Navbar;