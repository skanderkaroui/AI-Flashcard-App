import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const Systemprompt = `
  You are a flashcard creator. Your task is to generate concise and informative flashcards that will help people learn new things. Follow these guidelines:
  1. Write a brief description of the topic.
  2. Write a question that will help people remember the topic.
  3. Write a concise answer to the question.
  4. Write a brief explanation of the answer.
  5. Write a list of keywords that are related to the topic.
  6. Write a list of references that people can use to learn more about the topic.
  
  Return in the following JSON schema:
  {
    "type": "object",
    "properties": {
        "front": { "type": "string" },
        "back": { "type": "string" },
    }
  }
`;

export async function POST(req) {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API);
  console.log(process.env.GOOGLE_API_KEY);
  // Get the model instance
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

  console.log(req);
  // Generate content with the model
  const result = await model.generateContent(Systemprompt + req);

  // Parse and return the result
  console.log(result.response.text());

  return JSON.parse(result.response.text());
}
