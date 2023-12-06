import { NextRequest, NextResponse } from 'next/server';

const LINE_API_URL = 'https://api.line.me/v2/bot';
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
};
const PushMessage = async (userId: string, message: string) => {
  const body = {
    to: userId,
    messages: [
      {
        type: 'text',
        text: message,
      },
    ],
  };

  const response = await fetch(`${LINE_API_URL}/message/push`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  return new NextResponse(`Message sent: ${response.status}`, {
    status: response.status,
  });
};

const RichMenu = async (userId: string) => {
  await fetch(
    `${LINE_API_URL}/user/${userId}/richmenu/${process.env.RICH_MENU_ID}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
      },
    }
  );
  return new NextResponse('Change rich menu: OK', { status: 200 });
};

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      const { userId, message } = body;

      if (userId && message) {
        const res = await PushMessage(userId, message);
        await RichMenu(userId);
        return new NextResponse(`Message sent: ${res.status}`, { status: 200 });
      }
    } catch (error) {
      return new NextResponse('Error sending message', { status: 500 });
    }
  }

  return new NextResponse('Method not allowed', { status: 405 });
}
