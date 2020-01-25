import { APIGatewayProxyHandler } from 'aws-lambda';
import { error, success } from '../../util';
import { Task } from '../../entity';

export const deleteTask: APIGatewayProxyHandler = async (event) => {
  const { pathParameters } = event;
  if (!pathParameters) {
    return error('INTERNAL_SERVER_ERROR');
  }
  const { taskId } = pathParameters;
  const task = await Task.findOne(taskId);
  if (!task) {
    return error('NOT_FOUND', 'TASK_NOT_FOUND');
  }
  await task.remove();
  return success({ task });
};
