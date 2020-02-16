import { APIGatewayProxyHandler } from 'aws-lambda';
import { User } from '../../entity';
import { error, success, funcToHandler } from '../../util';

interface Body {
  email: string;
  password: string;
}

const login: APIGatewayProxyHandler = async (event) => {
  const { body } = event;
  const { email, password } = body as unknown as Body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return error('NOT_FOUND', 'USER_NOT_FOUND');
  }
  if (!user.comparePassword(password)) {
    return error('BAD_REQUEST', 'INVALID_PASSWORD');
  }
  const accessToken = await user.createAccessToken();
  return success({ accessToken, user });
};

export const handler = funcToHandler(login);
