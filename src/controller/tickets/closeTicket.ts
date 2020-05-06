import { APIGatewayProxyHandler } from 'aws-lambda'
import { error, success, funcToHandler } from '../../util'
import { Ticket } from '../../entity'

const closeTicket: APIGatewayProxyHandler = async (event) => {
  const { pathParameters } = event
  if (!pathParameters) {
    return error('INTERNAL_SERVER_ERROR')
  }
  const { ticketId } = pathParameters
  const ticket = await Ticket.findOne(ticketId)
  if (!ticket) {
    return error('NOT_FOUND', 'TICKET_NOT_FOUND')
  }
  ticket.closedAt = new Date()
  await ticket.save()
  return success({ ticket })
}

export const handler = funcToHandler(closeTicket)
