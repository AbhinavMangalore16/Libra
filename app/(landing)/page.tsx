"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Code,
  Images,
  MessageCircleMore,
  Music,
  Video,
} from "lucide-react";
import { useRouter } from "next/navigation";

const features = [
  {
    label: "Chatbot",
    icon: MessageCircleMore,
    color: "text-[#38B2AC]",
    bgcolor: "bg-[#38B2AC]/10",
    href: "/chatbot",
    description: "Engage in intelligent conversations with our AI chatbot.",
  },
  {
    label: "Code Generator",
    icon: Code,
    color: "text-[#6c9cfc]",
    bgcolor: "bg-[#6c9cfc]/10",
    href: "/code-gen",
    description: "Generate code snippets effortlessly with our AI.",
  },
  {
    label: "Image Generator",
    icon: Images,
    color: "text-[#7C4DFF]",
    bgcolor: "bg-[#7C4DFF]/10",
    href: "/images",
    description: "Create stunning images using AI technology.",
  },
  {
    label: "Video Generator",
    icon: Video,
    color: "text-[#4CAF50]",
    bgcolor: "bg-[#4CAF50]/10",
    href: "/video",
    description: "Generate captivating videos with AI assistance.",
  },
  {
    label: "Music Generator",
    icon: Music,
    color: "text-[#F4511E]",
    bgcolor: "bg-[#F4511E]/10",
    href: "/music",
    description: "Compose beautiful music using AI algorithms.",
  },
];

const LandingPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold">MyWebsite</h1>
        <div>
          <Link href="/sign-in">
            <Button variant="link" className="text-white mr-4">
              Login
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="link" className="text-white">
              Register
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-grow">
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                The Future of Work Starts Here
                <br className="hidden lg:inline-block" />
                Your AI Partner
              </h1>
              <p className="mb-8 leading-relaxed">
                Welcome to MyWebsite, where technology meets tomorrow. Explore our AI-powered tools designed to enhance your productivity and creativity. From intelligent conversations to generating code, images, videos, and music, we've got you covered.
              </p>
              <div className="flex justify-center">
                <Link href="/">
                  <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    Get Started
                  </button>
                </Link>
                <Link href="/">
                  <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <img className="object-cover object-center rounded" alt="Hero" src="https://dummyimage.com/720x600" />
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white p-5 text-center">
        <p>&copy; 2024 MyWebsite. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
