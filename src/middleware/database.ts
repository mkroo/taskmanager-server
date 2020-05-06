import { ConnectionManager, Connection, getConnectionManager, createConnection } from 'typeorm'
import * as entityObject from '../entity'
import 'reflect-metadata'

const {
  MYSQL_HOST,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env
const CONNECTION_NAME = 'default'

export const mysql = async () => {
  let connManager: ConnectionManager | undefined
  let conn: Connection

  if (!connManager) {
    connManager = getConnectionManager()
  }

  const entities = [...Object.values(entityObject)]
  if (connManager.has(CONNECTION_NAME)) {
    conn = connManager.get(CONNECTION_NAME)
    if (!conn.isConnected) {
      await conn.connect()
    }
  } else {
    conn = await createConnection({
      entities,
      database: MYSQL_DATABASE,
      synchronize: process.env.NODE_ENV !== 'production',
      type: 'mysql',
      host: MYSQL_HOST,
      username: MYSQL_USERNAME,
      password: MYSQL_PASSWORD,
      port: 3306,
      name: CONNECTION_NAME,
    })
  }

  console.log(entities)

  entities.forEach(e => e.useConnection(conn))
}
