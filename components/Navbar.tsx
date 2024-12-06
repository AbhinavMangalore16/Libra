"use client";
import { cn } from "@/lib/utils";
import { Code, FileText, Images, LayoutDashboard, MessageCircleMore, Music, Settings, Video } from "lucide-react";

import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { APICounter } from "./APICounter";

interface NavbarProps {
    apiLimitCount: number;
}

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-600"
    },
    {
        label: "Chatbot",
        icon: MessageCircleMore,
        href: "/chatbot",
        color: "text-[#38B2AC]",
    },
    {
        label: "CodeKraft",
        icon: Code,
        href: "/code-gen",
        color: "text-[#6c9cfc]"
    },
    {
        label: "AskPDF",
        icon: FileText,
        href: "/pdf-chatbot",
        color: "text-[#E4B1F0]"
    },
    {
        label: "Visionary",
        icon: Images,
        href: "/images",
        color: "text-[#7C4DFF]"
    }, {
        label: "StoryForge",
        icon: Video,
        href: "/video",
        color: "text-[#4CAF50]"
    }
    ,{
        label: "SoundWave",
        icon: Music,
        href: "/music",
        color: "text-[#F4511E]"
    },
    // {
    //     label: "Settings",
    //     icon: Settings,
    //     href: "/dashboard",
    //     color: "text-[#808080]"
    // }
];

const poppins = Poppins({
    weight: "600",
    subsets: ["latin"],
});

const Navbar = ({
    apiLimitCount
}: NavbarProps) => {
    const pathName = usePathname();
    return (
        <div className="flex flex-col h-full bg-[#1A1A2E] text-white space-y-4 py-4">
            <div className="flex-1 py-2 px-3">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-16 h-16 mr-1">
                        <Image fill alt="Libra logo!" src="/libra_logo.png" />
                    </div>
                    <h1 className={cn("text-2xl font-bold text-[#D3D3D3]", poppins.className)}>Libra</h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link href={route.href} key={route.href} className={cn("flex text-base group w-full justify-start font-medium cursor-pointer p-2 hover:bg-white/20 text-white rounded-lg transition", pathName === route.href ? "text-white bg-white/10" : "text-zinc-500")}>
                            <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                            {route.label}
                        </Link>
                    ))}
                </div>
            </div>
            <APICounter apiLimitCount={apiLimitCount} />
        </div>
    );
}

export default Navbar;
