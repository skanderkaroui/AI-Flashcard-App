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
  
  Return in the following JSON format:
  {
    "flashcards": {
        "front": str,
        "back": str
    }
  }
`;

export async function POST(req) {
  const genAI = new GoogleGenerativeAI({ apiKey: process.env.GOOGLE_API_KEY });
  const model = genAI.getGenerativeModel("gemini-1.5-flash");
  const requestData = await req.text();

  const completion = await model.generateContent({
    prompt: Systemprompt + requestData,
    maxTokens: 300,
  });

  const flashcard = JSON.parse(result.response.text());

  return NextResponse.json(flashcard.flashcards);
}
