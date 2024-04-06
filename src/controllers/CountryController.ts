import { FastifyRequest, FastifyReply, } from "fastify"
import { CountryService } from '../services/CountryService'
import { Country } from "../types/type"

class CountryController {
  constructor(private countryService = new CountryService()) {
  }

  async handleCreateCountry(request: FastifyRequest, reply: FastifyReply) {
    const countryData = request.body as Country
    const country = await this.countryService.createCountry(countryData)

    reply.send(country)
  }

  async handleCreateCountries(request: FastifyRequest, reply: FastifyReply) {
    const countryData = request.body as Country[]
    const countries = await this.countryService.createCountries(countryData)

    reply.send(countries)
  }

  async handleListAllCountries(request: FastifyRequest, reply: FastifyReply) {
    const { page, rows } = request.query as { page: string, rows: string }
    if (!page) {
      throw new Error('Missing page query parameter')
    }

    if (!rows) {
      throw new Error('Missing rows query parameter')
    }
    const listCountriesService = new CountryService()
    const countries = await this.countryService.getAllCountries(parseInt(page), parseInt(rows))

    reply.send(countries)
  }
}

export { CountryController }
