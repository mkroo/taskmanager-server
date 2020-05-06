import { APIGatewayProxyHandler } from 'aws-lambda'
import { Plan, User } from '../../entity'
import { error, success, funcToHandler } from '../../util'
import { headersToPayload } from '../../util/jwt'

interface Body {
  content: string
  deadline?: string
}
/**
 * @endpoint POST /plans
 */
const addPlan: APIGatewayProxyHandler = async (event) => {
  const { body, headers } = event
  const { content, deadline } = body as unknown as Body

  const { id: userId } = headersToPayload(headers)
  const user = await User.findOne(userId)
  if (!user) {
    return error('NOT_FOUND', 'USER_NOT_FOUND')
  }

  const plan = new Plan()
  plan.content = content
  plan.user = user
  plan.deadline = deadline || null

  await plan.save()

  return success({ plan })
}

export const handler = funcToHandler(addPlan)
