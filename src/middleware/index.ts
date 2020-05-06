import { APIGatewayProxyEvent } from 'aws-lambda'
import { MiddlewareObject } from 'middy'
import { mysql } from './database'

export const initialDB: MiddlewareObject<APIGatewayProxyEvent, any> = {
  before: async () => {
    await mysql()
  },
}
