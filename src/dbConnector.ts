import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'
import { FastifyInstance } from "fastify"


async function dbConnector(fastify: FastifyInstance) {
  fastify.register(fastifyMongo, {
    url: `${process.env.DATABASE_URL}`
  })
}

export default fastifyPlugin(dbConnector)
