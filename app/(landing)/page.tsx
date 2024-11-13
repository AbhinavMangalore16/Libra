"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Code, FileText, Images, MessageCircleMore, Music, Video } from "lucide-react";

const poppins = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const HeroSection = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <motion.div
          className="absolute rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-60 blur-3xl"
          initial={{ scale: 0.5, opacity: 0.4 }}
          animate={{ scale: 1.7, opacity: 0.8, rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "loop", ease: "linear" }}
          style={{ width: "500px", height: "500px", left: "15%", top: "20%" }}
        />
        <motion.div
          className="absolute rounded-full bg-gradient-to-br from-teal-500 to-blue-600 opacity-50 blur-3xl"
          initial={{ scale: 0.5, opacity: 0.4 }}
          animate={{ scale: 1.3, opacity: 0.7, rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "loop", ease: "linear" }}
          style={{ width: "400px", height: "400px", right: "15%", bottom: "20%" }}
        />
        <motion.div
          className="absolute rounded-full bg-gradient-to-br from-purple-400 to-blue-400 opacity-30 blur-3xl"
          initial={{ scale: 0.4, opacity: 0.2 }}
          animate={{ scale: 1.8, opacity: 0.5, rotate: 180 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "loop", ease: "linear" }}
          style={{ width: "600px", height: "600px", left: "50%", top: "40%", transform: "translateX(-50%)" }}
        />
      </div>

      <div className="z-10 text-center">
        <motion.h1
          className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Libra
        </motion.h1>
        <motion.h2
          className="mt-2 text-4xl font-semibold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Revolutionize Your Creativity with AI
        </motion.h2>
        <motion.p
          className="mt-4 text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Unlock the power of artificial intelligence to elevate your work to new heights.
        </motion.p>

        <div className="flex justify-center mt-8">
          <Link href="/sign-in">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg hover:bg-gradient-to-l hover:from-indigo-600 hover:to-purple-500 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              Login
            </motion.button>
          </Link>
          <Link href="/sign-up">
            <motion.button
              className="ml-4 px-8 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              Sign Up
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeatureSection = () => {
  const features = [
    {
      label: "Chatbot",
      icon: MessageCircleMore,
      color: "text-[#38B2AC]",
      bgcolor: "bg-[#38B2AC]/10",
      href: "/chatbot",
      description: "Engage in intelligent conversations with our AI chatbot."
    },
    {
      label: "Code Generator",
      icon: Code,
      color: "text-[#6c9cfc]",
      bgcolor: "bg-[#6c9cfc]/10",
      href: "/code-gen",
      description: "Generate code snippets effortlessly with our AI."
    },
    {
      label: "Image Generator",
      icon: Images,
      color: "text-[#7C4DFF]",
      bgcolor: "bg-[#7C4DFF]/10",
      href: "/images",
      description: "Create stunning images using AI technology."
    },
    {
      label: "Video Generator",
      icon: Video,
      color: "text-[#4CAF50]",
      bgcolor: "bg-[#4CAF50]/10",
      href: "/video",
      description: "Generate captivating videos with AI assistance."
    },
    {
      label: "Music Generator",
      icon: Music,
      color: "text-[#F4511E]",
      bgcolor: "bg-[#F4511E]/10",
      href: "/music",
      description: "Compose beautiful music using AI algorithms."
    },
    {
      label: "PDF Chatbot",
      icon: FileText,
      href: "/pdf-chatbot",
      color: "text-[#E4B1F0]",
      bgcolor: "bg-[#E4B1F0]/10",
      description: "Ask questions about your uploaded PDFs."
    },
  ];

  return (
    <div className="relative py-24 bg-gray-900 text-white">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          AI-Powered Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all"
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className={cn("p-2 w-fit rounded-md", feature.bgcolor)}>
                <feature.icon className={cn("w-6 h-6", feature.color)} />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.label}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Libra?",
      answer: "Libra is an AI-powered platform that helps you unlock your creativity."
    },
    {
      question: "How does the AI chatbot work?",
      answer: "Our chatbot uses advanced NLP to engage with users effectively."
    },
    {
      question: "Can I integrate the code generator with my IDE?",
      answer: "Yes, the code generator can be integrated with popular IDEs."
    },
    {
      question: "How to upgrade to access premium models?",
      answer: "You can upgrade to LibraPro by clicking on the button under the request limit in the dashboard navbar."
    }
  ];

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 bg-gray-800 text-white">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-700 rounded-lg overflow-hidden"
              onClick={() => toggleFAQ(index)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center p-4 cursor-pointer">
                <h3 className="font-semibold">{faq.question}</h3>
                <span>{openIndex === index ? "−" : "+"}</span>
              </div>
              {openIndex === index && (
                <div className="p-4 border-t border-gray-600">{faq.answer}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <FAQs />
      <footer className="py-8 bg-gray-900 text-center text-gray-400">
        <p>&copy; 2024 Abhinav Mangalore. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <Link href="https://x.com/PhoenixRFTA16" target="_blank">Twitter</Link>
          <Link href="https://www.facebook.com/profile.php?id=100008360348028" target="_blank">Facebook</Link>
          <Link href="https://www.linkedin.com/in/abhinav-mangalore-919b0a193/" target="_blank">LinkedIn</Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
