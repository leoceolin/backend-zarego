import { DownloadCountrisCsv } from "./services/DownloadCsv";
import * as fs from 'fs';
import { filename, filenameJSON } from "./utils/consts";
let csvToJson = require('convert-csv-to-json');

export function downloadAndConvertCsv() {
  const checkCsvExist = fs.existsSync(filename)
  if (!checkCsvExist) {
    DownloadCountrisCsv()
  }

  let fileInputName = filename;
  let fileOutputName = filenameJSON;

  csvToJson.formatValueByType().fieldDelimiter(',')
    .getJsonFromCsv(filename);

  csvToJson.generateJsonFileFromCsv(fileInputName, fileOutputName);
}
