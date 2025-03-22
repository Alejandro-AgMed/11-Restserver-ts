import dotenv from 'dotenv'
import Server from './models/server'
dotenv.config()

//configurar DotEnv
const server = new Server()

server.listen()