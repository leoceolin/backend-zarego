import { FastifyRequest, FastifyReply, } from "fastify"
import { CountryService } from '../services/CountryService'
import { Country } from "../types/type"

class CountryController {
  async handleCreateCountry(request: FastifyRequest, reply: FastifyReply) {
    const countryData = request.body as Country
    const countryService = new CountryService()
    const country = await countryService.createCountry(countryData)

    reply.send(country)
  }

  async handleCreateCountries(request: FastifyRequest, reply: FastifyReply) {
    const countryData = request.body as Country[]
    const countryService = new CountryService()
    const countries = await countryService.createCountries(countryData)

    reply.send(countries)
  }

  async handleListAllCountries(request: FastifyRequest, reply: FastifyReply) {
    const { page, rows } = request.query as { page: string, rows: string }
    const listCountriesService = new CountryService()
    const countries = await listCountriesService.getAllCountries(parseInt(page), parseInt(rows))

    reply.send(countries)
  }
}

export { CountryController }
