import { APIGatewayProxyHandler } from 'aws-lambda'
import { sendMessage } from '../../util/lineworks'
import { User, Task } from '../../entity'

import dedent from 'dedent'
import moment from 'moment'
import 'moment-timezone'
import { Between } from 'typeorm'
import { success, funcToHandler } from '../../util'

const check: APIGatewayProxyHandler = async () => {
  const users = await User.find()

  const from = moment().tz('Asia/Seoul').startOf('date').toDate()
  const to = moment().tz('Asia/Seoul').endOf('date').toDate()
  const tasks = await Task.find({
    where: { createdAt: Between(from, to) },
    relations: ['user'],
  })

  const standardKPI = 6
  const userList = []
  for (const user of users) {
    const taskCount = tasks.filter(task => task.user.id === user.id).length
    if (taskCount <= standardKPI) {
      userList.push({ taskCount, name: user.name })
    }
  }

  await sendMessage({
    accountId: 'sangyeob@tablemanager.io',
    content: {
      type: 'text',
      text: dedent`
        업무보고 작성 필요 명단
        ${userList.map(item => `${item.name}: ${item.taskCount}`).join('\n')}
      `,
    },
  })

  return success()
}

export const handler = funcToHandler(check)
