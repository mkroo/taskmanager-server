import { verify, sign } from 'jsonwebtoken';
import { User } from '../entity';
import { AuthenticationError, ApolloError } from 'apollo-server-lambda';

export interface Headers {
  [key: string]: string | undefined;
}

export interface Payload {
  id: string;
  name: string;
  isLeader: boolean;
}

const secret = process.env.JWT_SECRET;
const issuer = process.env.JWT_ISSUER;

export const authenticate = async (headers: Headers): Promise<User> => {
  const authorization = headers.authorization;
  if (!authorization) {
    throw new AuthenticationError('AUTHORIZETION_REQUIRED');
  }
  let payload: Payload;
  if (!secret) {
    throw new ApolloError('JWT_SECRET_REQUIRED');
  }
  if (!issuer) {
    throw new ApolloError('JWT_ISSUER_REQUIRED');
  }
  try {
    payload = verify(authorization, secret, { issuer }) as Payload;
  } catch (err) {
    throw new AuthenticationError('JWT_TOKEN_EXPIRED');
  }
  const user = await User.findOne(payload.id);
  if (!user) {
    throw new AuthenticationError('USER_NOT_FOUND');
  }
  return user;
};

export const generateAccessToken = (payload: Payload) => {
  if (!secret) {
    throw new ApolloError('JWT_SECRET_REQUIRED');
  }
  if (!issuer) {
    throw new ApolloError('JWT_ISSUER_REQUIRED');
  }
  const token = sign(payload, secret, { issuer, expiresIn: '1d' });
  return token;
};
