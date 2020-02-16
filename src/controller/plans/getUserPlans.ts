import { APIGatewayProxyHandler } from 'aws-lambda';
import { Plan, User } from '../../entity';
import { error, success, funcToHandler } from '../../util';

import moment from 'moment';
import 'moment-timezone';
import { LessThanOrEqual, IsNull } from 'typeorm';

/**
 * @endpoint GET /users/:userId/plans
 */
const getUserPlans: APIGatewayProxyHandler = async (event) => {
  const { pathParameters } = event;

  const userId = pathParameters?.userId as string;
  const user = await User.findOne(userId);
  if (!user) {
    return error('NOT_FOUND', 'USER_NOT_FOUND');
  }

  const plans = await Plan.find({
    where: [
      {
        user,
        closedAt: LessThanOrEqual(moment().tz('Asia/Seoul').endOf('date').toDate()),
      }, {
        user, closedAt: IsNull(),
      },
    ],
    order: {
      deadline: 'ASC',
      createdAt: 'ASC',
    },
  });

  return success({ plans });
};

export const handler = funcToHandler(getUserPlans);
