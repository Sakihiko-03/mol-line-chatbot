export interface LineEvent {
  message: Message;
  timestamp: string;
  replyToken: string;
  source: Source;
  type: string;
}

interface Message {
  id: string;
  text: string;
  type: string;
}

interface Source {
  userId: string;
  type: string;
}
