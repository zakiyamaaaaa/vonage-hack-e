import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL

  if (!webhookUrl) {
    throw new Error('API key is missing');
  }

  try {
    const { message } = await req.json();
    console.log(message)
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: message }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Message sent successfully' });
    } else {
      return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 });
    }
  } catch (error) {
    console.error('Failed to send message', error);
    return NextResponse.json({ success: false, error: 'An error occurred' }, { status: 500 });
  }
}