import { APIGatewayProxyHandler } from 'aws-lambda'
import { error, success, funcToHandler } from '../../util'
import { Ticket } from '../../entity'

const deleteTicket: APIGatewayProxyHandler = async (event) => {
  const { pathParameters } = event
  if (!pathParameters) {
    return error('INTERNAL_SERVER_ERROR')
  }
  const { ticketId } = pathParameters
  const ticket = await Ticket.findOne(ticketId)
  if (!ticket) {
    return error('NOT_FOUND', 'TICKET_NOT_FOUND')
  }
  await ticket.remove()
  return success({ ticket })
}

export const handler = funcToHandler(deleteTicket)
