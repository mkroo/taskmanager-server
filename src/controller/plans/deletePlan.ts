import { APIGatewayProxyHandler } from 'aws-lambda';
import { Plan } from '../../entity';
import { error, success, funcToHandler } from '../../util';

/**
 * @endpoint DELETE /plans/:planId
 */
const deletePlan: APIGatewayProxyHandler = async (event) => {
  const { pathParameters } = event;
  const planId = pathParameters?.planId;

  const plan = await Plan.findOne(planId);
  if (!plan) {
    return error('NOT_FOUND', 'PLAN_NOT_FOUND');
  }
  await plan.remove();

  return success({ plan });
};

export const handler = funcToHandler(deletePlan);
