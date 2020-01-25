import { APIGatewayProxyResult } from 'aws-lambda';

export const success = (data?: string | object): APIGatewayProxyResult => {
  const statusCode = 200;
  let bodyJson = { message: 'API호출에 성공하였습니다.' } as object;
  if (data) {
    if (typeof data === 'string') {
      bodyJson = { message: data };
    } else {
      bodyJson = data;
    }
  }
  const body = JSON.stringify(bodyJson);
  return { statusCode, body };
};

const errorTemplate = {
  BAD_REQUEST: {
    statusCode: 400,
    define: 'BAD_REQUEST',
    message: '잘못된 요청입니다.',
  },
  UNAUTHORIZED: {
    statusCode: 401,
    define: 'UNAUTHORIZED',
    message: '요청에 필요한 토큰이 없습니다.',
  },
  FORBIDDEN: {
    statusCode: 403,
    define: 'FORBIDDEN',
    message: '요청에 필요한 권한이 없습니다.',
  },
  NOT_FOUND: {
    statusCode: 404,
    define: 'NOT_FOUND',
    message: '리소스가 존재하지 않습니다.',
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    define: 'INTERNAL_SERVER_ERROR',
    message: '내부 처리 중 오류가 발생되었습니다.',
  },
};
type ErrorStatus =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'INTERNAL_SERVER_ERROR';

export const error = (status: ErrorStatus, err?: string | object): APIGatewayProxyResult => {
  const { statusCode, message } = errorTemplate[status];
  let bodyJson = { message } as object;
  if (typeof err === 'string') {
    bodyJson = { message: err };
  }
  if (err instanceof Error) {
    console.error(err);
    bodyJson = { message: err.message };
  }
  const body = JSON.stringify(bodyJson);

  return { statusCode, body };
};
