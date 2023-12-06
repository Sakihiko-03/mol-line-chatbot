import { NextRequest, NextResponse } from 'next/server';

import { LineEvent } from '@/types/dialogflow';

const LINE_API_URL = 'https://api.line.me/v2/bot';
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
};

async function replyText(token: string, texts: string | string[]) {
  const replyMessage = Array.isArray(texts) ? texts : [texts];

  const body = {
    replyToken: token,
    messages: replyMessage.map((text: string) => ({ type: 'text', text })),
  };

  try {
    const response = await fetch(`${LINE_API_URL}/message/reply`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    return response;
  } catch (error) {
    throw new Error('Failed to send reply message');
  }
}

const handleTextMessage = async (intentText: string, replyToken: string) => {
  switch (intentText) {
    case 'Menu1 : ติดตามผลจากระบบ e-Tracking':
      await replyText(
        replyToken,
        'สถานะการนำคนต่างด้าวเข้ามามีทั้งหมด 2 คำข้อ\n1. ขอนำคนต่างด้าวเข้ามาตามมาตรา 59 : อยู่ในระหว่างการดำเนินการ\n2. คำขอนำคนต่างด้าวเข้าตามมาตรา 46/1 : อยู่ระหว่างดำเนินการ'
      );
      break;
    case 'Menu2 : การนัดหมาย':
      await replyText(
        replyToken,
        'ทาง DOE ได้มีการนัดหมาย\nวันที่ : 12 ธันวาคม 2566\nเวลา : 13:30 น.\nสถานที่ : กรมการจัดหางาน ถนนมิตรไมตรี เขตดินแดง กรุงเทพฯ 10400\nเลขที่นัดหมาย : 53-24452-3'
      );
      break;
    default:
      throw new Error('Invalid message text');
  }
};

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new NextResponse('', {
      status: 405,
      statusText: 'Method Not Allowed',
    });
  }

  try {
    const body = await req.json();
    const { queryResult, originalDetectIntentRequest } = body;
    const intent = queryResult.intent.displayName;
    const { source, payload } = originalDetectIntentRequest;
    const linePayload: LineEvent = payload.data;

    if (
      source === 'line' &&
      linePayload?.type === 'message' &&
      linePayload.message.type === 'text'
    ) {
      await handleTextMessage(intent, linePayload.replyToken);
    } else {
      return new NextResponse('', { status: 200, statusText: 'No event type' });
    }

    return new NextResponse('', { status: 200, statusText: 'Success' });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 400,
      }
    );
  }
}
