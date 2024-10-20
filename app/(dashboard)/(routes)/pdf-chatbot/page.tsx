// /pages/pdf-chatbot.tsx
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const PDFChatBot: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onSubmit = async (data: any) => {
    if (!selectedFile) {
      alert("Please upload a PDF first.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("pdf", selectedFile);
      formData.append("prompt", data.prompt);

      const response = await axios.post("/api/chatbot-pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessages((prev) => [
        ...prev,
        { role: "user", content: data.prompt },
        { role: "assistant", content: response.data.text },
      ]);

      reset(); // Reset the form
      setSelectedFile(null); // Clear selected file
    } catch (error) {
      console.error("Error sending prompt:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">PDF Chatbot</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Upload PDF</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="mt-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Your Question</label>
          <input
            {...register("prompt", { required: true })}
            type="text"
            placeholder="Ask something about the PDF..."
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Processing..." : "Send"}
        </button>
      </form>

      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 my-2 rounded-lg ${
              msg.role === "user" ? "bg-blue-200" : "bg-gray-200"
            }`}
          >
            <p className="text-sm">
              <strong>{msg.role === "user" ? "You" : "Chatbot"}: </strong>
              {msg.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PDFChatBot;
