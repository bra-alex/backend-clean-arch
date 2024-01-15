import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URL as string

mongoose.connection.once('open', () => console.log('Connected'))

mongoose.connection.on('error', err => console.error(err))

async function connectMongo() {
  return await mongoose.connect(MONGO_URL)
}

async function disconnectMongo() {
  return await mongoose.disconnect()
}

export { connectMongo, disconnectMongo }
