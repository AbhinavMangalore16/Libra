"use client";

import React, { useEffect, useState } from "react";
import * as zod from "zod";
import Heading from "@/components/Heading";
import { Code, Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
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

const MusicGen: React.FC = () => {
  const premium = usePremium();
  const router = useRouter();
  const [music, setMusic] = useState<string>();
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const loading = form.formState.isSubmitting;
  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);
      const response = await axios.post("/api/music", values);
      setMusic(response.data.audio);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403){
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
    "Create a relaxing ambient track",
    "Generate a catchy pop melody",
    "Compose a classical piano piece",
    "Make a hip-hop beat",
    "Generate a jazz improvisation",
    "Compose a soundtrack for a sci-fi movie",
    "Create a rock guitar riff",
    "Write a country song about heartbreak",
    "Generate a techno track",
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
        title="SoundWave - Music Generator"
        description="Generate original music tracks and melodies using Riffusion, tailored to your specific needs and genres."
        icon={Music}
        iconColor="text-[#F4511E]"
        backgroundColor="bg-[#F4511E]/10"
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
              className="col-span-12 lg:col-span-2 w-full bg-[#F4511E]"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="px-4 lg:px-8 mt-6">
        {loading && <Loading color="#F4511E"/>}
        {!music && !loading && (
          <NothingWhatSoEver label="Nothing in here! Pure silence" normalImageSrc="/musical-pentagram.png" hoverImageSrc="/qr-code-easter-egg2.png" />
        )}
        {music && (
            <audio controls className="w-full mt-4">
              <source src={music}/>
            </audio>
          )}
      </div>
    </div>
  );
};

export default MusicGen;
