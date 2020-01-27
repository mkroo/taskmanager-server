import { APIGatewayProxyHandler } from 'aws-lambda';
import { Ticket } from '../../entity';
import { success } from '../../util';
import { IsNull, Not } from 'typeorm';

export const getTickets: APIGatewayProxyHandler = async (event) => {
  const { queryStringParameters } = event;
  let close = false;
  if (queryStringParameters) {
    const { closeQuery } = queryStringParameters;
    if (closeQuery) {
      close = true;
    }
  }
  const tickets = await Ticket.find({
    where: {
      closedAt: close ? Not(IsNull()) : IsNull(),
    },
    relations: ['project'],
  });
  return success({ tickets });
};
