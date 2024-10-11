import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const { to } = await req.json();
    const apiKey = process.env.VONAGE_API_KEY || '';
    const agent_id = process.env.AGENT_ID || '';
    const url = 'https://studio-api-us.ai.vonage.com/telephony/make-call';

    const body = {
      agent_id,
      to,
      hangup_on_answer_machine: false,
      session_parameters: [
        {
          name: 'PROPERTY_VALUE',
          value: '500',
        },
      ],
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Vgai-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
