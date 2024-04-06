import Fastify from "fastify";
import { routes } from "./routes";
import cors from "@fastify/cors";
import { downloadAndConvertCsv } from "./utils/downloadAndConvertCsv";
import { populateDatabase } from "./prisma/populateDatabase";
import dbConnector from './prisma/dbConnector'
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

  const port = parseInt(process.env.PORT || "3333")

  try {
    app.listen({ port, host: "0.0.0.0", }, () => {
      console.log("API running on port 3333")
    })
  } catch (error) {
    console.log("error fastify", error)
    process.exit(1)
  }
}

start()
