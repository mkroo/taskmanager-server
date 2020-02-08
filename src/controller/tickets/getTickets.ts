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

  const sortedTickets = tickets.sort(sortTicket);
  return success({ tickets: sortedTickets });
};

const sortTicket = (a: Ticket, b: Ticket) => {
  const [ap, ai] = a.id.split('-');
  const [bp, bi] = b.id.split('-');
  if (ap !== bp) {
    return ap > bp ? 1 : -1;
  }
  return parseInt(ai, 10) - parseInt(bi, 10);
};
