import path from 'path'
import { DataSource, DataSourceOptions } from 'typeorm'

let connection: DataSource | null = null

const getConnectionOptions = async (): Promise<DataSourceOptions> => {
  return {
    type: 'sqlite',
    database: path.join(__dirname, '/../../../../../../projects.db'),
    entities: [path.join(__dirname, '/../entity.*s')],
    synchronize: false,
    logging: process.env.NODE_ENV !== 'production'
  }
}

export const getConnection = async (): Promise<DataSource> => {
  if (connection && connection.isInitialized) return connection

  const options = await getConnectionOptions()
  connection = new DataSource(options)
  await connection.initialize()

  return connection
}

export const closeConnection = async (): Promise<void> => {
  if (connection && connection.isInitialized) {
    await connection.destroy()
    connection = null
  }
}
