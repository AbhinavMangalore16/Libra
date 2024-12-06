"use client";

import React, { useEffect, useState } from "react";
import * as zod from "zod";
import Heading from "@/components/Heading";
import { Code, Music, Video } from "lucide-react";
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
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VideoGen: React.FC = () => {
  const premium = usePremium();
  const router = useRouter();
  const [video, setVideo] = useState<string>();
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const loading = form.formState.isSubmitting;
  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);
      const response = await axios.post("/api/video", values);
      setVideo(response.data[0]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403){
        premium.onOpen();
      }else if (error?.response?.status === 500) {
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
    "Create a short video of a sunrise over a mountain range.",
    "Generate a video of a bustling city street at night with neon lights.",
    "Produce a video of a serene beach with waves gently crashing on the shore.",
    "Create a time-lapse video of flowers blooming in a garden.",
    "Generate a video of a calm forest with birds singing and leaves rustling.",
    "Produce a video of a cozy fireplace with crackling flames and a softly glowing room.",
    "Create a video of a fast-paced cityscape with cars and pedestrians moving.",
    "Generate a video of a snowy landscape with falling snow and a distant mountain view.",
    "Produce a video of a space scene with planets and stars slowly rotating.",
    "Create a video of a waterfall cascading into a clear pool of water in a lush jungle.",
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
        title="StoryForge - Video Generator"
        description="Generate unique and engaging videos using our advanced AI technology to specific themes and styles,"
        icon={Video}
        iconColor="text-[#4CAF50]"
        backgroundColor="bg-[#4CAF50]/10"
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
              className="col-span-12 lg:col-span-2 w-full bg-[#4CAF50]"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="px-4 lg:px-8 mt-6">
        {loading && <Loading color="#4CAF50" />}
        {!video && !loading && (
          <Nothing label="No video generated..... yet!" imageSrc="/video-prod.png" />
        )}
        {video && (
          <video
            className=" w-full aspect-video mt-4 rounded-lg border-bg-grey"
            controls
          >
            <source src={video} />
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoGen;
