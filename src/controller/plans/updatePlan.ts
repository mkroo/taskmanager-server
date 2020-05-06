import { APIGatewayProxyHandler } from 'aws-lambda'
import { Plan } from '../../entity'
import { error, success, funcToHandler } from '../../util'

interface Body {
  state?: 'open' | 'close'
}
/**
 * @endpoint POST /plans/:planId/close
 */
const updatePlan: APIGatewayProxyHandler = async (event) => {
  const { pathParameters, body } = event
  const planId = pathParameters?.planId
  const { state } = body as unknown as Body

  const plan = await Plan.findOne(planId)
  if (!plan) {
    return error('NOT_FOUND', 'PLAN_NOT_FOUND')
  }

  console.log(state)

  if (state === 'open') {
    plan.closedAt = null
  }
  if (state === 'close') {
    plan.closedAt = new Date()
  }
  await plan.save()

  return success({ plan })
}

export const handler = funcToHandler(updatePlan)
