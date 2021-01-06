import axios from 'axios';
import * as csv from 'fast-csv';
import fs from 'fs';
import path from 'path';
import { GOOGLE_MAPS_API_KEY } from '../../consts';

const geocode = async (address: string) => {
  const urlForm = 'https://maps.googleapis.com/maps/api/geocode/json?';
  const apiKey = 'key=' + GOOGLE_MAPS_API_KEY;
  try {
    const urlEncodedAddress = `address=${encodeURIComponent(address)}`;
    const URL = urlForm + urlEncodedAddress + '&' + apiKey;
    const response: any = await axios.get(URL);
    const latLng = response.data.results[0].geometry.location;
    return latLng;
  } catch (err) {
    console.log(err);
  }
};

/*
RegionId | Region | first 2 digits of postal code
1 | North | 72-73 && 77-78 && 75-76
2 | East | 46-52 && 81
3 | West | 60-71
4 | Central | 01-45 && 58-59
5 | NorthEast | 53-57 && 79-80
*/

const getRegionId = (address: string) => {
  const postalCode = address.substring(address.indexOf('S(') + 2);
  const firstTwoDigits = parseInt(postalCode.substring(0, 2));
  const isInNorth = firstTwoDigits <= 78 && firstTwoDigits >= 72 && firstTwoDigits !== 74;
  const isInEast = (firstTwoDigits <= 52 && firstTwoDigits >= 46) || firstTwoDigits === 81;
  const isInWest = firstTwoDigits <= 71 && firstTwoDigits >= 60;
  const isInCentral = firstTwoDigits <= 45 || firstTwoDigits === 58 || firstTwoDigits === 59;
  const isInNorthEast =
    (firstTwoDigits <= 57 && firstTwoDigits >= 53) ||
    firstTwoDigits === 79 ||
    firstTwoDigits === 80;
  if (isInNorth) {
    return '1';
  } else if (isInEast) {
    return '2';
  } else if (isInWest) {
    return '3';
  } else if (isInCentral) {
    return '4';
  } else if (isInNorthEast) {
    return '5';
  } else {
    throw new RangeError('Invalid postalcode. Unable to get region from postalcode');
  }
};

const updateRow = async (row: any) => {
  const address = row.address;
  const latLng = await geocode(address);
  const regionId = getRegionId(address);
  return {
    name: row.name,
    address: row.address,
    regionId: regionId,
    latLng: JSON.stringify(latLng),
  };
};

const SEEDS_FILE_PATH = './';
const hawkerCentreFilename = 'HawkerCentres.csv';

export const updateLatLngAndRegionId = async () => {
  const stream = fs.createReadStream(
    path.resolve(__dirname, SEEDS_FILE_PATH, hawkerCentreFilename)
  );
  const promises: any[] = [];
  try {
    await new Promise((resolve, reject) => {
      stream
        .pipe(csv.parse({ headers: ['name', 'address'] }))
        .on('error', error => {
          reject(error);
        })
        .on('data', async row => {
          promises.push(
            new Promise(resolve => {
              resolve(updateRow(row));
            })
          );
        })
        .on('end', async () => {
          const ws = fs.createWriteStream(
            path.resolve(__dirname, SEEDS_FILE_PATH, hawkerCentreFilename)
          );
          Promise.all(promises)
            .then(updatedRows => {
              csv
                .write(updatedRows)
                .pipe(ws)
                .on('finish', () => {
                  resolve('Updated HawkerCentre.csv');
                });
            })
            .catch(error => {
              reject(error);
            });
        });
    });
  } catch (err) {
    if (err instanceof RangeError) {
      throw err;
    }
    console.log('No update on HawkerCentre.csv');
  }
};
