import { DownloadCountrisCsv } from "../services/DownloadCsv";
import * as fs from 'fs';
import { filename, filenameJSON } from "./consts";
import { CountryService } from "../services/CountryService";
let csvToJson = require('convert-csv-to-json');

export async function downloadAndConvertCsv() {
  const checkJSONExists = fs.existsSync(filenameJSON)
  const country = new CountryService()

  const { total_registers } = await country.getAllCountries()
  const checkCsvExist = fs.existsSync(filename)
  if (!checkCsvExist && !total_registers && !checkJSONExists) {
    DownloadCountrisCsv()

    let fileInputName = filename;
    let fileOutputName = filenameJSON;

    csvToJson.formatValueByType().fieldDelimiter(',')
      .getJsonFromCsv(filename);

    csvToJson.generateJsonFileFromCsv(fileInputName, fileOutputName);
  }


}
