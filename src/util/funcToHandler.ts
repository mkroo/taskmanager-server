import { APIGatewayProxyHandler } from 'aws-lambda';
import middy from 'middy';
import { jsonBodyParser, doNotWaitForEmptyEventLoop, httpErrorHandler, cors } from 'middy/middlewares';
import { initialDB } from '../middleware';

export const funcToHandler = (func: APIGatewayProxyHandler) => {
  const handler = middy(func);

  handler
    .use(jsonBodyParser())
    .use(doNotWaitForEmptyEventLoop())
    .use(cors())
    .use(httpErrorHandler())
    .use(initialDB);

  return handler;
};
