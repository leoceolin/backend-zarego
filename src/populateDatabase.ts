
import * as fs from 'fs';
import { filenameJSON } from "./utils/consts";
import { CountryService } from './services/CountryService';
import { formatterDate } from './utils/dateFormatter';

export async function populateDatabase() {
  const checkJSONExists = fs.existsSync(filenameJSON)
  const country = new CountryService()

  const { total_registers } = await country.getAllCountries()

  if (checkJSONExists && !total_registers) {
    const currentDate = new Date();


    fs.readFile(filenameJSON, "utf8", (error, data) => {
      if (error) {
        console.log('Error reading json:', error);
        return;
      }
      const parsedData = JSON.parse(data).map((item: any) => {
        return {
          Country: item.Country,
          CountryName: item.CountryName,
          PerformanceOriented: item.PerformanceOriented,
          Autocratic: item.Autocratic,
          Decisive: item.Decisive,
          Diplomatic: item.Diplomatic,
          FaceSaver: item?.['Face-saver'],
          DateAdded: formatterDate(currentDate),
        }
      })

      country.createCountries(parsedData)
    });
  }
}
