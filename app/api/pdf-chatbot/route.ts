// /pages/api/chatbot-pdf.ts
import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "langchain";
import { PdfLoader } from "langchain/document_loaders/fs/pdf";
import formidable from "formidable";
import fs from "fs";
import path from "path";

// Helper function to save the uploaded PDF
const uploadDir = path.resolve("./public/uploads");

const parseForm = async (req: NextApiRequest) =>
  new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
    (resolve, reject) => {
      const form = new formidable.IncomingForm({ uploadDir, keepExtensions: true });
      form.parse(req, (err: any, fields: any, files: any) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    }
  );

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for file upload
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const { files, fields } = await parseForm(req);

      const prompt = fields.prompt as string;
      const pdfFilePath = (files.pdf as formidable.File).filepath;

      // Load PDF content using LangChain's PdfLoader
      const pdfLoader = new PdfLoader(pdfFilePath);
      const documents = await pdfLoader.load();

      // Initialize LangChain and OpenAI API
      const openai = new OpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
      });

      // Query based on the prompt and PDF content
      const query = `The user uploaded a PDF. Now answer their question: ${prompt}`;
      const response = await openai.call({
        input: query,
        context: documents.map((doc: any) => doc.text).join("\n"),
      });

      res.status(200).json({ text: response.text });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error in chatbot-pdf handler:", error);
    res.status(500).json({ error: "An error occurred while processing the request." });
  }
}
