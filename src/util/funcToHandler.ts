import { APIGatewayProxyHandler } from 'aws-lambda';
import middy from 'middy';
import { jsonBodyParser, doNotWaitForEmptyEventLoop, httpErrorHandler, cors } from 'middy/middlewares';
import { initialDB } from '../middleware';

interface HandlerOption {
  permission?: 'user' | 'leader' | 'admin';
}
export const funcToHandler = (func: APIGatewayProxyHandler, option?: HandlerOption) => {
  const handler = middy(func);

  handler
    .use(jsonBodyParser())
    .use(doNotWaitForEmptyEventLoop())
    .use(cors())
    .use(httpErrorHandler())
    .use(initialDB);

  return handler;
};
