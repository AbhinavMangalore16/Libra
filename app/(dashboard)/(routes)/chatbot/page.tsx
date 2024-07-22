"use client";

import React, { useEffect, useState } from "react";
import * as zod from "zod";
import Heading from "@/components/Heading";
import { MessageCircleMoreIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ChatBot = () => {
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const loading = form.formState.isSubmitting;
  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    console.log(values);
  };

  const examplePrompts = [
    "Explain superconductors",
    "Write a story in my favourite genre",
    "Plan a relaxing day in Goa",
    "How do planes fly?",
    "Pick outfit to look great on camera",
    "Suggest a recipe with what's in my kitchen",
    "Create a workout plan",
    "Quiz me on world capitals",
    "How to overcome procrastination?",
    "Write an essay on road accidents"
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
  }, [placeholder, isDeleting, loopNum, typingSpeed, examplePrompts, isFocused]);

  return (
    <div>
      <Heading
        title="ChatBot"
        description="Engage in intelligent conversations with our AI-powered chatbot, designed to assist you with a wide range of queries."
        icon={MessageCircleMoreIcon}
        iconColor="text-[#38B2AC]"
        backgroundColor="bg-[#38B2AC]/10"
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
                        setPlaceholder(examplePrompts[loopNum % examplePrompts.length]);
                      }}
                      onInput={() => setIsFocused(true)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-span-12 lg:col-span-2 w-full bg-teal-700" disabled={loading}>
              {loading ? "Generating..." : "Generate"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChatBot;
