import { APIGatewayProxyHandler } from 'aws-lambda';
import { error, success, funcToHandler } from '../../util';
import { Ticket } from '../../entity';

const getTicket: APIGatewayProxyHandler = async (event) => {
  const { pathParameters } = event;
  if (!pathParameters) {
    return error('INTERNAL_SERVER_ERROR');
  }
  const { ticketId } = pathParameters;
  const ticket = await Ticket.findOne(ticketId);
  return success({ ticket });
};

export const handler = funcToHandler(getTicket);
