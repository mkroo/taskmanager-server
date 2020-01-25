import { APIGatewayProxyHandler } from 'aws-lambda';
import { Task, User } from '../../entity';
import { In, Between } from 'typeorm';
import { success } from '../../util';
import moment from 'moment';
import 'moment-timezone';

export const getTasks: APIGatewayProxyHandler = async (event) => {
  const { queryStringParameters } = event;

  let users: User[] = [];
  let from: Date = moment().tz('Asia/Seoul').startOf('date').toDate();
  let to: Date = moment().tz('Asia/Seoul').endOf('date').toDate();
  if (queryStringParameters) {
    const { userId, teamId, from: fromQuery, to: toQuery } = queryStringParameters;
    if (userId) {
      const user = await User.findOne(userId);
      if (user) {
        users = [user];
      }
    }
    if (teamId) {
      users = await User.find({ where: { team: teamId } });
    }
    from = moment(fromQuery).tz('Asia/Seoul').startOf('date').toDate();
    to = moment(toQuery).tz('Asia/Seoul').endOf('date').toDate();
  }
  const tasks = await Task.find({
    where: {
      user: In(users),
      closedAt: Between(from, to),
    },
  });
  return success({ tasks });
};
