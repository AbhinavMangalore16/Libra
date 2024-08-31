"use client";

import React, { useState } from "react";
import * as zod from "zod";
import Heading from "@/components/Heading";
import { Mic, Volume2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Nothing } from "@/components/Nothing";
import { Loading } from "@/components/Loading";

const formSchema = zod.object({
  text: zod.string().min(1, "Text is required"),
  audio: zod.any().optional(),
});

const SpeechService: React.FC = () => {
  const router = useRouter();
  const [result, setResult] = useState<string | null>(null);
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      audio: null,
    },
  });

  const loading = form.formState.isSubmitting;

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      setResult(null);

      // Convert text to speech
      if (values.text) {
        const response = await axios.post("/api/text-to-speech", {
          text: values.text,
        });
        const audioURL = response.data; // Assume the API returns a URL to the generated audio
        setResult(audioURL);
      } 
      // Convert speech to text
      else if (values.audio) {
        const formData = new FormData();
        formData.append("audio", values.audio[0]);
        const response = await axios.post("/api/speech-to-text", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const textResult = response.data; // Assume the API returns the text result
        setResult(textResult);
      }

      form.reset();
    } catch (error: any) {
      console.error("Error processing request:", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Speech to Text & Text to Speech"
        description="Convert speech to text or generate speech from text using AI-powered APIs."
        icon={Mic}
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
              name="text"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-8">
                  <FormControl className="m-0 p-0">
                    <Input
                      {...field}
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      placeholder="Enter text for TTS or upload audio for STT..."
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="audio"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-8">
                  <FormControl className="m-0 p-0">
                    <Input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => field.onChange(e.target.files)}
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full bg-[#7C4DFF]"
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="px-4 lg:px-8 mt-6">
        {loading && <Loading color="#6c9cfc" />}
        {result === null && !loading && (
          <Nothing
            label="No result available"
            imageSrc="/audio-icon.png"
          />
        )}
        {result && (
          <div className="mt-4">
            {typeof result === "string" ? (
              <audio controls src={result} className="w-full">
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p className="text-lg">{result}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeechService;