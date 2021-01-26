// This script will read a hawker centre's address and compute the regionId, lat and lng for it.
// Can choose whether to refetch data for all rows or only those with missing values by
// passing in a boolean to updateLatLngAndRegionId()

import * as csv from 'fast-csv';
import fs from 'fs';
import path from 'path';
import { geocode, getRegionId } from '../utils/geocodingUtil';

interface HawkerCentreRow {
  name: string;
  address: string;
  regionId?: number;
  lat?: number;
  lng?: number;
}

const seedDir = path.resolve(__dirname, '../db/seeds');
const seedFileName = 'HawkerCentres.csv';
const seedFilePath = path.join(seedDir, seedFileName);

// Compute regionId and fetch geocoding data
async function updateRow(row: HawkerCentreRow) {
  const { address } = row;
  const regionId = getRegionId(address);
  const { lat, lng } = await geocode(address);

  return {
    ...row,
    regionId,
    lat,
    lng,
  };
}

function missingVal(row: HawkerCentreRow) {
  const { regionId, lat, lng } = row;
  return !regionId || !lat || !lng;
}

async function updateLatLngAndRegionId(resetAll = false) {
  const stream = fs.createReadStream(seedFilePath);
  const promises: Promise<HawkerCentreRow>[] = [];

  try {
    stream
      .pipe(csv.parse({ headers: true }))
      .on('data', async row => {
        promises.push(
          new Promise(resolve => {
            if (resetAll || missingVal(row)) {
              resolve(updateRow(row));
            } else {
              resolve(row);
            }
          })
        );
      })
      .on('end', async () => {
        const ws = fs.createWriteStream(seedFilePath);
        const updatedRows: HawkerCentreRow[] = await Promise.all(promises);
        csv.writeToStream(ws, updatedRows, { headers: true });
      });
  } catch (err) {
    console.log(err);
  }
}

(async function () {
  await updateLatLngAndRegionId();
})();
