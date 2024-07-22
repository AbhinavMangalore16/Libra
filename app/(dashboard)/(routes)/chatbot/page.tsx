"use client";

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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Heading
        title="ChatBot"
        description="Engage in intelligent conversations with our AI-powered chatbot, designed to assist you with a wide range of queries."
        icon={MessageCircleMoreIcon}
        iconColor="text-[#38B2AC]"
        backgroundColor="bg-[#38B2AC]/10"
        textColor="text-[#333]"
      />
      <div className="px-4 lg:px-8 mt-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-6 focus-within:shadow-lg bg-white grid grid-cols-12 gap-4"
          >
            <FormField
              name="prompt"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      {...field}
                      className="border-gray-300 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500 rounded-md"
                      placeholder="Type your message..."
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="col-span-12 lg:col-span-2 flex items-center justify-center">
              <Button
                type="submit"
                className="w-full lg:w-auto bg-teal-500 text-white hover:bg-teal-600 transition-colors"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChatBot;