import * as fs from 'fs';
import * as https from 'https';
import { filename } from '../utils/consts';

export function DownloadCountrisCsv() {
  https.get('https://api.data.world/v0/file_download/adamhelsinger/globe-project/GLOBE-Phase-2-Aggregated-Leadership-Data.csv', { headers: { Authorization: `Bearer ${process.env.DATA_WORLD_TOKEN}` } }, (res: any) => {
    const fileStream = fs.createWriteStream(filename);
    res.pipe(fileStream);

    fileStream.on('finish', () => {
      fileStream.close();
      console.log('Download finished')
    });
  })
}
