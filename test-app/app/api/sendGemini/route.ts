import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export interface responseType {
  resText: string;
}

export const POST = async (req: NextRequest): Promise<NextResponse<responseType>> => {
  const apiKey = process.env.API_KEY || ''
  // Make sure to include these imports:
  // import { GoogleGenerativeAI } from "@google/generative-ai";
  if (!apiKey) {
    throw new Error('API key is missing');
  }
  try {
    const { query } = await req.json();
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
    const prompt = `
    次のメッセージに絵文字を追加して感情豊かに書き換えてください
    ## メッセージ
    ${query}
    ## 絵文字を追加したメッセージ
    `;
  
    const result = await model.generateContent(prompt);
    const resText = result.response.text();
    console.log(resText);
    return NextResponse.json(({ resText }));
  } catch (error) {
    console.error("Error fetching data:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ resText: errorMessage }, { status: 500 });
  }
}
