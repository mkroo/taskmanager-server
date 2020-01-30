import {  APIGatewayProxyHandler } from 'aws-lambda';
import { TicketType, Ticket } from '../../entity/ticket';
import { Project } from '../../entity';
import { error, success } from '../../util';

interface Body {
  name: string;
  priority?: number;
  description?: string;
  type?: TicketType;
  projectId: string;
}
export const addTicket: APIGatewayProxyHandler = async (event) => {
  const { body } = event;
  const {
    name,
    priority = 5,
    description = '',
    type = TicketType.DEV,
    projectId,
  } = body as unknown as Body;

  const project = await Project.findOne(projectId);
  if (!project) {
    return error('NOT_FOUND', 'PROJECT_NOT_FOUND');
  }

  const exTickets = await Ticket.find({
    where: { project },
    order: { id: 'DESC' },
  });
  const ticketIds = exTickets
    .map(ticket => parseInt(ticket.id.split('-')[1], 10))
    .sort((a, b) => a - b);
  const newId = ticketIds.length === 0 ? 1 : ticketIds[0];
  const ticket = new Ticket();
  ticket.name = name;
  ticket.priority = priority;
  ticket.description = description;
  ticket.type = type;
  ticket.project = project;
  ticket.id = `${project.id.toUpperCase()}-${newId}`;
  await ticket.save();

  return success({ ticket });
};
