import axios from 'axios';

const botId = 727580;
const url = `https://q6kt1rojdf.execute-api.ap-northeast-2.amazonaws.com/dev/message/v1/bot/${botId}/message/push`;

interface TextContent {
  type: 'text';
  text: string;
}

interface LinkContent {
  type: 'link';
  contentText: string;
  linkText: string;
  link: string;
}

interface MessageBody {
  accountId?: string;
  roomId?: string;
  content: TextContent | LinkContent;
}

export const sendMessage = async (body: MessageBody) => {
  const res = await axios.post(url, body);
  return res.data;
};
