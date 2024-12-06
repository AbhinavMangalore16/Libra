"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Code, FileText, Images, MessageCircleMore, Music, Video } from "lucide-react";
import { FaEnvelope, FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdContactSupport } from "react-icons/md";

const poppins = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const HeroSection = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      {/* GitHub Icon */}
      <div className="absolute top-4 right-4 z-10 flex items-center space-x-4">
        {/* Email Icon */}
        <Link href="mailto:abhinavm16104@gmail.com">
          <motion.div
            className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all group"
            whileHover={{ scale: 1.1 }}
          >
            <FaEnvelope
              className="text-white w-6 h-6 group-hover:text-gray-300 transition-colors"
              aria-label="Email for feedback"
            />
            <motion.div
              className="absolute top-full mt-2 hidden group-hover:flex justify-center items-center bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Email me!
            </motion.div>
          </motion.div>
        </Link>

        {/* GitHub Icon */}
        <Link href="https://github.com/AbhinavMangalore16/Libra" target="_blank">
          <motion.div
            className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all group"
            whileHover={{ scale: 1.1 }}
          >
            <FaGithub
              className="text-white w-6 h-6 group-hover:text-gray-300 transition-colors"
              aria-label="GitHub repository link"
            />
            <motion.div
              className="absolute top-full mt-2 hidden group-hover:flex justify-center items-center bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Source code!
            </motion.div>
          </motion.div>
        </Link>
      </div>

      {/* Starfield background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black via-indigo-900 to-black opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
        {/* Small stars */}
        {[...Array(211)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-50"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        ))}
      </div>

      {/* Glowing stellar orbs with subtle scaling */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-full bg-gradient-to-br from-teal-400 to-indigo-600 opacity-70 blur-2xl 
          lg:right-[10%] lg:bottom-[20%]
          md:right-[15%] md:bottom-[25%]
          sm:right-[5%] sm:bottom-[10%]"
        style={{
          width: "350px",
          height: "350px",
        }}
      />
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-full bg-gradient-to-br from-blue-500 to-purple-700 opacity-80 blur-3xl 
          lg:left-[10%] lg:top-[25%]
          md:left-[15%] md:top-[30%]
          sm:left-[5%] sm:top-[15%]"
        style={{
          width: "450px",
          height: "450px",
        }}
      />

      {/* Hero Text */}
      <div className="z-10 text-center px-4">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Libra
        </motion.h1>
        <motion.h2
          className="mt-2 text-2xl md:text-4xl font-semibold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Revolutionize Your Creativity with AI
        </motion.h2>
        <motion.p
          className="mt-4 text-sm md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Unlock the power of artificial intelligence to elevate your work to new heights.
        </motion.p>

        {/* Buttons with hover animations */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Link href="/sign-in">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg hover:bg-gradient-to-l hover:from-indigo-600 hover:to-purple-500 transition-all"
              whileHover={{ scale: 1.1 }}
            >
              Login
            </motion.button>
          </Link>
          <Link href="/sign-up">
            <motion.button
              className="ml-4 px-8 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all"
              whileHover={{ scale: 1.1 }}
            >
              Sign Up
            </motion.button>
          </Link>
        </motion.div>
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
      description: "Engage in intelligent conversations with our AI chatbot.",
      status: "Available",
    },
    {
      label: "CodeKraft",
      icon: Code,
      color: "text-[#6c9cfc]",
      bgcolor: "bg-[#6c9cfc]/10",
      href: "/code-gen",
      description: "Generate code snippets effortlessly with our AI!",
      status: "Available",
    },
    {
      label: "AskPDF",
      icon: FileText,
      color: "text-[#E4B1F0]",
      bgcolor: "bg-[#E4B1F0]/10",
      href: "/pdf-chatbot",
      description: "Ask questions about your uploaded PDFs.",
      status: "Work in Progress",
      extra: "Currently under development. Check back soon!",
    },
    {
      label: "Visionary",
      icon: Images,
      color: "text-[#7C4DFF]",
      bgcolor: "bg-[#7C4DFF]/10",
      href: "/images",
      description: "Create stunning images using AI technology.",
      status: "Coming Soon",
      extra: "This feature is under development and will be available soon!",
    },
    {
      label: "StoryForge",
      icon: Video,
      color: "text-[#4CAF50]",
      bgcolor: "bg-[#4CAF50]/10",
      href: "/video",
      description: "Generate captivating videos with AI assistance.",
      status: "Work in Progress",
      extra: "We are actively working to bring this feature to you!",
    },
    {
      label: "SoundWave",
      icon: Music,
      color: "text-[#F4511E]",
      bgcolor: "bg-[#F4511E]/10",
      href: "/music",
      description: "Compose beautiful music using AI algorithms.",
      status: "Coming Soon",
      extra: "Stay tuned! This exciting feature is coming soon!",
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
              className="relative p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all"
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
              {/* Additional notice for features under development */}
              {feature.extra && (
                <p className="mt-2 text-sm text-gray-400">{feature.extra}</p>
              )}
              {/* Conditional tooltip display for "Coming Soon" or "Work in Progress" */}
              {feature.status !== "Available" && (
                <motion.div
                  className="absolute top-2 right-2 px-2 py-1 bg-gray-700 text-xs rounded-lg text-gray-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {feature.status}
                </motion.div>
              )}
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
      answer: "Libra is an AI-powered platform designed to assist you in generating creative content, solving technical problems, and enhancing productivity using advanced AI models.",
    },
    {
      question: "Who can use Libra?",
      answer: "Anyone! Whether you're a developer, designer, content creator, or student, Libra provides tools to simplify your workflow.",
    },
    {
      question: "Is Libra free to use?",
      answer: "Yes, Libra offers a free tier with limited usage. You can upgrade to our Pro plan for extended features and higher limits.",
    },
    {
      question: "Do I need prior AI knowledge to use Libra?",
      answer: "Not at all! Libra is designed to be user-friendly for everyone, from beginners to advanced users.",
    },
    {
      question: "How secure is my data?",
      answer: "Your data is encrypted and stored securely. We do not share or sell user data.",
    },
    {
      question: "What happens if I exceed my free tier limits?",
      answer: "You'll be prompted to upgrade to a Pro plan for additional requests and features.",
    },
    // {
    //   question: "Can I cancel my subscription anytime?",
    //   answer: "Yes, you can cancel your subscription at any time through your account settings.",
    // },
    // {
    //   question: "What payment methods do you accept?",
    //   answer: "We accept major credit cards, debit cards, and online payment gateways.",
    // },
    {
      question: "I encountered an error. How can I get support?",
      answer: "You can reach out to our support team via email at phoenixrfta1614@gmail.com (given at footer)",
    },
    {
      question: "How do I report a bug or suggest a feature?",
      answer: "You can report bugs or provide feedback directly through support (given at footer) or email us at phoenixrfta1614@gmail.com.",
    },
  ];


  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 bg-gray-800 text-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-700 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center p-4 cursor-pointer"
              >
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
          {/* Twitter */}
          <Link href="https://x.com/PhoenixRFTA16" target="_blank">
            <motion.div
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2 }}
            >
              <FaTwitter className="w-6 h-6" aria-label="Twitter" />
            </motion.div>
          </Link>
          {/* Facebook */}
          <Link href="https://www.facebook.com/profile.php?id=100008360348028" target="_blank">
            <motion.div
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2 }}
            >
              <FaFacebook className="w-6 h-6" aria-label="Facebook" />
            </motion.div>
          </Link>
          {/* LinkedIn */}
          <Link href="https://www.linkedin.com/in/abhinav-mangalore-919b0a193/" target="_blank">
            <motion.div
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2 }}
            >
              <FaLinkedin className="w-6 h-6" aria-label="LinkedIn" />
            </motion.div>
          </Link>
          {/* Feedback Email */}
          <Link href="mailto:phoenixrfta1614@gmail.com">
            <motion.div
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2 }}
            >
              <MdContactSupport className="w-6 h-6" aria-label="Email for feedback" />
            </motion.div>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
