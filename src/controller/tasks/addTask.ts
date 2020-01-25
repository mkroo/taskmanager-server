import { APIGatewayProxyHandler } from 'aws-lambda';
import { headersToPayload } from '../../util/jwt';
import { User, Ticket, Task } from '../../entity';
import { error, success } from '../../util';

interface Body {
  content: string;
  woringTime: number;
  ticketId: string;
}
export const addTask: APIGatewayProxyHandler = async (event) => {
  const { body, headers } = event;

  let user: User;
  try {
    const payload = headersToPayload(headers);
    user = await User.findOneOrFail(payload.id);
  } catch (err) {
    return error('BAD_REQUEST', err);
  }

  const { content, woringTime, ticketId } = body as unknown as Body;
  const ticket = await Ticket.findOne(ticketId);
  if (!ticket) {
    return error('NOT_FOUND', 'TICKET_NOT_FOUND');
  }
  const task = new Task();
  task.content = content;
  task.workingTime = woringTime;
  task.ticket = ticket;
  task.user = user;
  await task.save();

  return success({ task });
};
