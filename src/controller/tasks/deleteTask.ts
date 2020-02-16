import { APIGatewayProxyHandler } from 'aws-lambda';
import { error, success, funcToHandler } from '../../util';
import { Task } from '../../entity';

const deleteTask: APIGatewayProxyHandler = async (event) => {
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

export const handler = funcToHandler(deleteTask);
