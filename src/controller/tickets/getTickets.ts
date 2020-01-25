import { APIGatewayProxyHandler } from 'aws-lambda';
import { Ticket } from '../../entity';
import { success } from '../../util';
import { LessThan, MoreThan } from 'typeorm';

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
      closedAt: close ? MoreThan(new Date()) : LessThan(new Date()),
    },
  });
  return success({ tickets });
};
