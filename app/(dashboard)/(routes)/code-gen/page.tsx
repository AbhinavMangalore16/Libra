"use client";

import React, { useEffect, useState } from "react";
import * as zod from "zod";
import Heading from "@/components/Heading";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { Nothing } from "@/components/Nothing";
import { Loading } from "@/components/Loading";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/UserAvatar";
import { AssistantAvatar } from "@/components/AssistantAvatar";
import Markdown from "react-markdown";
import { NothingWhatSoEver } from "@/components/NothingWhatSoEver";
import { usePremium } from "@/hooks/use-premium";

const CodeGen: React.FC = () => {
  const premium = usePremium();
  const router = useRouter();
  const [messages, setMessages] = useState<
    { role: "system" | "user" | "assistant"; content: string }[]
  >([]);
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const loading = form.formState.isSubmitting;
  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      const userMsg: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };
      const response = await axios.post("/api/code-gen", {
        prompt: values.prompt,
      });
      const botMsg: ChatCompletionMessageParam = {
        role: "assistant",
        content: response.data.text,
      };
      setMessages((current: any) => [...current, userMsg, botMsg]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403){
        premium.onOpen();
      }
      console.error("Error generating response:", error);
    } finally {
      router.refresh();
    }
  };

  const examplePrompts = [
    "Write a Dockerfile to containerize a simple web application",
    "Generate a bash script to automate backups of a directory",
    "Write a function in JavaScript to reverse a string",
    "Generate a Python script to read a CSV file and print the contents",
    "Create a SQL query to find all users older than 30",
    "Write a React component to display a list of items",
    "Generate a CSS snippet for a responsive navigation bar",
    "Write a unit test in Jest for a function that adds two numbers",
    "Generate a Java class to model a car with properties for make, model, and year",
    "Create a REST API endpoint in Node.js using Express to get all products",
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
      <Heading
        title="CodeCraft - Code Generator"
        description="Your coding copilot to automate code generation across multiple languages and frameworks using our Gemini-powered AI."
        icon={Code}
        iconColor="text-[#6c9cfc]"
        backgroundColor="bg-[#6c9cfc]/10"
        textColor="text-[#333]"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-2 md:px-4 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    {/* Replacing Input with Textarea for multiline and scrollable input */}
                    <textarea
                      {...field}
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent resize-none h-40 w-full overflow-auto p-2 rounded-lg"
                      placeholder={placeholder}
                      disabled={loading}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => {
                        setIsFocused(false);
                        // Restart typing effect if needed
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
              className="col-span-12 lg:col-span-2 w-full bg-[#6c9cfc]"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="px-4 lg:px-8 mt-6">
        {loading && <Loading color="#6c9cfc" />}
        {messages.length === 0 && !loading && (
          <NothingWhatSoEver label="Nothing in here! No conversation initiated." normalImageSrc="/code-typing.png" hoverImageSrc="/qr-code-easter-egg.png" />
        )}
        <div className="flex flex-col-reverse gap-y-4">
          {messages.map((msg, index) => (
            <div
              key={msg.content}
              className={cn(
                "p-8 w-full flex items-start gap-x-8 rounded-lg",
                msg.role === "user"
                  ? "bg-white border border-black/10"
                  : "bg-muted"
              )}
            >
              {msg.role === "user" ? <UserAvatar /> : <AssistantAvatar />}
              <p className="text-sm">
                <Markdown components={{
                  pre: ({node, ...props}) =>(
                    <div className="overflow-auto w-full my-2 bg-[#0f182c]/10 p-2 rounded-lg">
                      <pre {...props}/>
                    </div>
                  ),
                  code: ({node, ...props}) =>(
                    <code className="bg-[#0f182c]/5 p-1 rounded-lg" {...props}/>
                  )
                }}
                className="text-sm overflow-hidden leading-7">
                  {typeof msg.content === "string" ? msg.content : null}
                </Markdown>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeGen;
