import { APIGatewayProxyHandler } from 'aws-lambda';
import { Task, User } from '../../entity';
import { In, Between, FindConditions } from 'typeorm';
import { success, error } from '../../util';
import moment from 'moment';
import 'moment-timezone';

export const getTasks: APIGatewayProxyHandler = async (event) => {
  const { queryStringParameters } = event;

  let from: Date = moment().tz('Asia/Seoul').startOf('date').toDate();
  let to: Date = moment().tz('Asia/Seoul').endOf('date').toDate();
  const where: FindConditions<Task> = {};
  if (queryStringParameters) {
    const { userId, teamId, from: fromQuery, to: toQuery } = queryStringParameters;
    if (userId) {
      const user = await User.findOne(userId);
      if (!user) {
        return error('NOT_FOUND', 'USER_NOT_FOUND');
      }
      where.user = user;
    }
    if (teamId) {
      const users = await User.find({ where: { team: teamId } });
      where.user = In(users.map(u => u.id));
    }
    from = moment(fromQuery).tz('Asia/Seoul').startOf('date').toDate();
    to = moment(toQuery).tz('Asia/Seoul').endOf('date').toDate();
  }

  where.createdAt = Between(from, to);
  const relations = ['user', 'ticket'];
  const tasks = await Task.find({ where, relations });
  return success({ tasks });
};
