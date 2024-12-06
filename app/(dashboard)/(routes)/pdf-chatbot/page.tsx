"use client";

import React, { useEffect, useState } from "react";
import * as zod from "zod";
import Heading from "@/components/Heading";
import { FileText, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants"; // Update this schema to match PDF prompt structure
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Nothing } from "@/components/Nothing";
import { Loading } from "@/components/Loading";
import { NothingWhatSoEver } from "@/components/NothingWhatSoEver";
import { usePremium } from "@/hooks/use-premium";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PDFChatbot: React.FC = () => {
  const premium = usePremium();
  const router = useRouter();
  const [response, setResponse] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const loading = form.formState.isSubmitting;
  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      setResponse(undefined);
      
      // Create a form data object for file upload
      const formData = new FormData();
      formData.append("prompt", values.prompt);

      if (selectedFile) {
        formData.append("file", selectedFile);
      } else {
        alert("Please upload a PDF file first.");
        return;
      }

      const response = await axios.post("/api/pdf-chatbot", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResponse(response.data.answer);
      form.reset();
      setSelectedFile(null); // Reset file selection
    } catch (error: any) {
      if (error?.response?.status === 403) {
        premium.onOpen();
      }
      else if (error?.response?.status === 500) {
        toast.error("The feature is currently unavailable (for now). We are working on it! Please check back soon.",
          {  position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            }
        )
      }
      console.error("Error generating response:", error);
    } finally {
      router.refresh();
    }
  };

  const examplePrompts = [
    "Summarize the main points of the PDF",
    "What is the conclusion of the document?",
    "Find specific details from the report",
    "Give an overview of the first chapter",
    "Explain the statistics mentioned",
    "What are the key arguments in the text?",
    "List all references found in the document",
  ];

  const [placeholder, setPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setPlaceholder(""); // Clear the placeholder when input is focused
      return;
    }

    const handleType = () => {
      const i = loopNum % examplePrompts.length;
      const fullText = examplePrompts[i];

      setPlaceholder(
        isDeleting
          ? fullText.substring(0, placeholder.length - 1)
          : fullText.substring(0, placeholder.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && placeholder === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && placeholder === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(timer);
  }, [
    placeholder,
    isDeleting,
    loopNum,
    typingSpeed,
    examplePrompts,
    isFocused,
  ]);

  return (
    <div>
      <ToastContainer/>
      <Heading
        title="AskPDF - PDF Chatbot"
        description="Interact with your PDF documents using an AI-powered chatbot. Get answers, summaries, and detailed insights from any PDF."
        icon={FileText}
        iconColor="text-[#E4B1F0]"
        backgroundColor="bg-[#E4B1F0]/10"
        textColor="text-[#333]"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-2 md:px-4 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            {/* File Upload Input */}
            <div className="col-span-12 lg:col-span-10">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setSelectedFile(e.target.files ? e.target.files[0] : null)
                }
                className="file-input mb-4"
              />
              {selectedFile && (
                <p className="text-sm text-gray-600">
                  Selected file: {selectedFile.name}
                </p>
              )}
            </div>

            <FormField
              name="prompt"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      {...field}
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      placeholder={placeholder}
                      disabled={loading}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => {
                        setIsFocused(false);
                        setPlaceholder(
                          examplePrompts[loopNum % examplePrompts.length]
                        );
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full bg-[#E4B1F0]"
              disabled={loading}
            >
              {loading ? "Processing..." : "Ask"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="px-4 lg:px-8 mt-6">
        {loading && <Loading color="#E4B1F0" />}
        {!response && !loading && (
          <NothingWhatSoEver label="No response yet. Upload a PDF and ask questions!" normalImageSrc="/pdf-placeholder.png" hoverImageSrc="/qr-code-easter-egg.png" />
        )}
        {response && (
          <div className="bg-gray-800 p-4 rounded-lg mt-4 text-white">
            {response}
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFChatbot;
