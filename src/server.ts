import Fastify from "fastify";
import { routes } from "./routes";
import cors from "@fastify/cors";
import { downloadAndConvertCsv } from "./downloadAndConvertCsv";
import { populateDatabase } from "./populateDatabase";
import 'dotenv/config'

const app = Fastify({ logger: true })

const start = async () => {
  app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message })
  })

  await app.register(cors)
  await app.register(routes)

  downloadAndConvertCsv()
  populateDatabase()

  try {
    await app.listen({ port: 3333 })
  } catch (error) {
    process.exit(1)
  }
}

start()
