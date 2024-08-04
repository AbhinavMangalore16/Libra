"use client";

import React, { useEffect, useState } from "react";
import * as zod from "zod";
import Heading from "@/components/Heading";
import { Code, Image } from "lucide-react";
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

const CodeGen: React.FC = () => {
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
      console.error("Error generating response:", error);
    } finally {
      router.refresh();
    }
  };

  const examplePrompts = [
    "Generate an image of a futuristic city skyline at sunset.",
"Create an illustration of a magical forest with glowing plants and mystical creatures.",
"Design a vibrant abstract pattern with geometric shapes and bold colors.",
"Generate a detailed image of a cozy cabin in the mountains during winter.",
"Create a realistic portrait of a person with a serene expression.",
"Design an image of a bustling market street in a historic town.",
"Generate an image of a serene beach with clear blue water and palm trees.",
"Create an artistic representation of a space scene with planets and stars.",
"Design an image of a classic car parked in front of a vintage diner.",
"Generate a fantasy landscape with floating islands and a magical waterfall.",
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
        title="Image Generator"
        description="Harness the power of Gemini AI to effortlessly create and customize images"
        icon={Image}
        iconColor="text-[#7C4DFF]"
        backgroundColor="bg-[#7C4DFF]/10"
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
                    <Input
                      {...field}
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
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
              className="col-span-12 lg:col-span-2 w-full bg-[#7C4DFF]"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="px-4 lg:px-8 mt-6">
        {loading && <Loading color="#6c9cfc"/>}
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
