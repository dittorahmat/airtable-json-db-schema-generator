"use client";

import Image from "next/image";
import InputArea from "@/components/InputArea";
import ClarificationChat from "@/components/ClarificationChat";
import DatabaseUnderstanding from "@/components/DatabaseUnderstanding";
import WorkflowsList from "@/components/WorkflowsList";
import AirtableJSON from "@/components/AirtableJSON";
import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; content: string }[]
  >([]);
  const [databaseUnderstanding, setDatabaseUnderstanding] = useState("");
  const [workflows, setWorkflows] = useState<{ entity: string; workflows: string[] }[]>([]);
  const [airtableJSON, setAirtableJSON] = useState("");
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    // Load API key from environment variables
    setApiKey(process.env.NEXT_PUBLIC_GEMINI_API_KEY || null);
  }, []);

  const handleInputChange = (text: string) => {
    setInputText(text);
  };

  const generateContent = async (prompt: string) => {
    if (!apiKey) {
      console.error("API key not found in environment variables.");
      return "API key not found. Please set NEXT_PUBLIC_GEMINI_API_KEY.";
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      return response.text();
    } catch (error: any) {
      console.error("Error generating content:", error);
      return `Error generating content: ${error.message}`;
    }
  };

  const handleGenerate = async () => {
    // Add user input to messages
    setMessages([...messages, { role: "user", content: inputText }]);

    // Construct prompt for AI model
    const prompt = `
      You are a database schema generator. Analyze the following client description and generate a JSON object with the following keys:
      1. databaseUnderstanding: A concise understanding of the database tables and relationships.
      2. workflows: A list of workflows (sorted by table/entity) that can be demonstrated to the client.
      3. airtableJSON: JSON for the Airtable API to create the tables & relations.  Include linked fields to represent relationships between tables (e.g., a "Teacher" field in the "Cohorts" table should be a linked field to the "Teachers" table).

      Client Description:
      ${inputText}

      Return ONLY a valid JSON object, without any markdown code fences or any other additional text or conversation.
    `;

    // Generate content using the AI model
    const aiResponse = await generateContent(prompt);

    // Log the raw AI response
    console.log("Raw AI Response:", aiResponse);

    // Parse the AI response
    try {
      // Extract JSON from the response string
      const jsonString = aiResponse.substring(
        aiResponse.indexOf("{"),
        aiResponse.lastIndexOf("}") + 1
      );
      const parsedResponse = JSON.parse(jsonString);
      setDatabaseUnderstanding(parsedResponse.databaseUnderstanding);
      setWorkflows(parsedResponse.workflows);
      setAirtableJSON(JSON.stringify(parsedResponse.airtableJSON, null, 2));
      setMessages([...messages, { role: "ai", content: aiResponse }]);
    } catch (error: any) {
      console.error("Error parsing AI response:", error);
      setMessages([
        ...messages,
        {
          role: "ai",
          content: `Error parsing AI response: ${error}. Raw response: ${aiResponse}`,
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Airtable Database Schema Generator</h1>
      <InputArea onInputChange={handleInputChange} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleGenerate}
      >
        Generate
      </button>
      <ClarificationChat messages={messages} />
      <DatabaseUnderstanding understanding={databaseUnderstanding} />
      <WorkflowsList workflows={workflows} />
      <AirtableJSON json={airtableJSON} />
    </div>
  );
}
