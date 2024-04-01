import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { CountryController } from "./controllers/CountryController";

export async function routes(fastify: FastifyInstance) {
  fastify.get('/getCountryInformation', async (request: FastifyRequest, reply: FastifyReply) => {
    return new CountryController().handleListAllCountries(request, reply)
  })

  fastify.post('/country', async (request: FastifyRequest, reply: FastifyReply) => {
    return new CountryController().handleCreateCountry(request, reply)
  })

  fastify.post('/countries', async (request: FastifyRequest, reply: FastifyReply) => {
    return new CountryController().handleCreateCountries(request, reply)
  })
}
