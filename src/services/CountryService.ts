import { Country } from "../types/type";
import prismaClient from "../prisma";
import { formatterDate } from "../utils/dateFormatter";

class CountryService {
  async createCountry(countryData: Country) {// create only one country
    const country = await prismaClient.countries.create({
      data: countryData
    })
    return country
  }

  async createCountries(countryData: Country[]) {// create many countries
    const countries = await prismaClient.countries.createMany({
      data: countryData
    })

    return countries
  }

  async getAllCountries(page: number = 1, rows: number = 10) {
    const currentDay = new Date()
    const offset = (page - 1) * rows;
    const totalRegisters = await prismaClient.countries.count()

    const countries = await prismaClient.countries.
      findMany({
        skip: offset,
        take: rows,
      })

    const finalCountries = countries.map((country: Country) => {
      return { ...country, DateExecuted: formatterDate(currentDay) }
    })
    return { countries: finalCountries, total_registers: totalRegisters }
  }
}

export { CountryService }
