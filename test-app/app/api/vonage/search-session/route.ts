import { SessionResponse } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
) => {
  const { searchParams } = req.nextUrl;
  const sessionId = searchParams.get('sessionId');

  if (typeof sessionId !== 'string') return ;

  const apiKey = process.env.VONAGE_API_KEY || '';
  const url = `https://studio-api-us.ai.vonage.com/insights/sessions/search/${sessionId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Vgai-Key': apiKey,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json() as SessionResponse;
    const lastUserMessage = data.transcription.filter(elem => elem.user).at(-1)?.user;
    const audioUrl  = data.channel_data.audio_url

    return NextResponse.json({
      success: true,
      lastUserMessage,
      audioUrl
    });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};