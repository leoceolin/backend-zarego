import Fastify from "fastify";
import { routes } from "./routes";
import cors from "@fastify/cors";
import { downloadAndConvertCsv } from "./downloadAndConvertCsv";
import { populateDatabase } from "./populateDatabase";
import dbConnector from './dbConnector'
import { config } from 'dotenv'
config({ path: '.env3' })

const app = Fastify({ logger: true })

const start = async () => {

  app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message })
  })

  app.register(dbConnector)
  await app.register(cors)
  await app.register(routes)

  downloadAndConvertCsv()
  populateDatabase()

  try {
    app.listen({ port: 3333, host: "0.0.0.0", }, () => {
      console.log("API running on port 3333")
    })
  } catch (error) {
    console.log("error fastify", error)
    process.exit(1)
  }
}

start()
