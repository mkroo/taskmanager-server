import { APIGatewayProxyHandler } from 'aws-lambda'
import { sendMessage } from '../../util/lineworks'
import { User, Task } from '../../entity'

import dedent from 'dedent'
import moment from 'moment'
import 'moment-timezone'
import { Between } from 'typeorm'
import { success, funcToHandler } from '../../util'

const alert: APIGatewayProxyHandler = async () => {
  const users = await User.find()

  const from = moment().tz('Asia/Seoul').startOf('date').toDate()
  const to = moment().tz('Asia/Seoul').endOf('date').toDate()
  const tasks = await Task.find({
    where: { createdAt: Between(from, to) },
    relations: ['user'],
  })

  for (const user of users) {
    const taskCount = tasks.filter(task => task.user.id === user.id).length
    if (taskCount >= 8) continue
    const message = dedent`
      업무보고를 작성해주세요!
      현재 KPI : ${taskCount}
    `
    await sendMessage({
      accountId: user.email,
      content: {
        type: 'link',
        contentText: message,
        linkText: '업무보고툴 바로가기',
        link: 'http://tablemanager-taskmanager-dev.s3-website.ap-northeast-2.amazonaws.com/task',
      },
    })
  }

  return success()
}

export const handler = funcToHandler(alert)
