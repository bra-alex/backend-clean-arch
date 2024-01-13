import { connection, connect, disconnect } from 'mongoose'

const MONGO_URL = process.env.MONGO_URL as string

connection.once('open', () => console.log('Connected'))

connection.on('error', err => console.error(err))

async function connectMongo() {
  return await connect(MONGO_URL)
}

async function disconnectMongo() {
  await disconnect()
}

export { connectMongo, disconnectMongo }
