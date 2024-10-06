'use client';
import React from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const ButtonComponent: React.FC = () => {
  const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const sendGemini = async (): Promise<string> => {
    // Make sure to include these imports:
    // import { GoogleGenerativeAI } from "@google/generative-ai";
    if (!apiKey) {
      throw new Error('API key is missing');
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Hello";

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
  }

  const sendMessageToDiscord = async (messageContent: string) => {
    const message = {
      content: messageContent,
    };

    if (!webhookUrl) {
      throw new Error('API key is missing');
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });

    if (response.ok) {
      console.log('Message sent successfully!');
    } else {
      console.error('Failed to send message');
    }
  } catch (error) {
    console.error('Failed to send message', error);
  }
}

  return (
    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      // onClick={sendMessageToDiscord}
      // onClick={sendGemini}
      onClick={async () => {
        const generatedText = await sendGemini();
        sendMessageToDiscord(generatedText);
      }}
    >
      Click Me
    </button>
  );
};

export default ButtonComponent;