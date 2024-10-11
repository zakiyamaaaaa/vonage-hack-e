import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const accessToken = process.env.LINE_NOTIFY_TOKEN;

  if (!accessToken) {
    throw new Error('LINE Notify token is missing');
  }

  try {
    const { message } = await req.json();
    console.log(message);

    const url = 'https://notify-api.line.me/api/notify';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${accessToken}`,
    };

    const body = new URLSearchParams({
      message,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: body.toString(),
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
};
