import { verify, sign } from 'jsonwebtoken'
import { User } from '../entity'
import { Unauthorized, InternalServerError } from 'http-errors'

export interface Headers {
  [key: string]: string | undefined
}

export interface Payload {
  id: string
  name: string
  isLeader: boolean
}

const secret = process.env.JWT_SECRET
const issuer = process.env.JWT_ISSUER
if (!secret) {
  throw new InternalServerError('JWT_SECRET_REQUIRED')
}
if (!issuer) {
  throw new InternalServerError('JWT_ISSUER_REQUIRED')
}

export const headersToPayload = (headers: Headers): Payload => {
  const { Authorization } = headers
  if (!Authorization) {
    throw new Unauthorized('AUTHORIZETION_REQUIRED')
  }
  const [tokenType, token] = Authorization.split(' ')
  if (tokenType !== 'Bearer') {
    throw new Unauthorized('INVALID_TOKEN_TYPE')
  }
  let payload: Payload
  try {
    payload = verify(token, secret, { issuer }) as Payload
  } catch (err) {
    throw new Unauthorized('JWT_TOKEN_EXPIRED')
  }
  return payload
}

export const generateAccessToken = (payload: Payload) => {
  const token = sign(payload, secret, { issuer, expiresIn: '30d' })
  return token
}
