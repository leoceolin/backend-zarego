import Fastify from "fastify";
import { routes } from "./routes";
import cors from "@fastify/cors";
import { downloadAndConvertCsv } from "./downloadAndConvertCsv";
import { populateDatabase } from "./populateDatabase";


const app = Fastify({ logger: true })

const start = async () => {

  downloadAndConvertCsv()

  app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message })
  })

  await app.register(cors)
  await app.register(routes)

  populateDatabase()

  try {
    await app.listen({ port: 3333 })
  } catch (error) {
    process.exit(1)
  }
}

start()
