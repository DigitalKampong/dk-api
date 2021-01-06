// This script will read a hawker centre's address and find a suitable regionId and latlng for it.

// import axios from 'axios';
import * as csv from 'fast-csv';
import fs from 'fs';
import path from 'path';
import { geocode, getRegionId } from '../utils/geocodingUtil';
// import { GMAPS_API_KEY } from '../consts';

// const geocode = async (address: string) => {
//   const urlForm = 'https://maps.googleapis.com/maps/api/geocode/json?';
//   const apiKey = 'key=' + GMAPS_API_KEY;
//   try {
//     const urlEncodedAddress = `address=${encodeURIComponent(address)}`;
//     const URL = urlForm + urlEncodedAddress + '&' + apiKey;
//     console.log(URL);
//     const response: any = await axios.get(URL);
//     // console.log(response);
//     const latLng = response.data.results[0].geometry.location;
//     return latLng;
//   } catch (err) {
//     console.log(err);
//   }
// };

// /*
// RegionId | Region | first 2 digits of postal code
// 1 | North | 72-73 && 77-78 && 75-76
// 2 | East | 46-52 && 81
// 3 | West | 60-71
// 4 | Central | 01-45 && 58-59
// 5 | NorthEast | 53-57 && 79-80
// */

// const getRegionId = (address: string) => {
//   const postalCode = address.substring(address.indexOf('S(') + 2);
//   const firstTwoDigits = parseInt(postalCode.substring(0, 2));
//   const isInNorth = firstTwoDigits <= 78 && firstTwoDigits >= 72 && firstTwoDigits !== 74;
//   const isInEast = (firstTwoDigits <= 52 && firstTwoDigits >= 46) || firstTwoDigits === 81;
//   const isInWest = firstTwoDigits <= 71 && firstTwoDigits >= 60;
//   const isInCentral = firstTwoDigits <= 45 || firstTwoDigits === 58 || firstTwoDigits === 59;
//   const isInNorthEast =
//     (firstTwoDigits <= 57 && firstTwoDigits >= 53) ||
//     firstTwoDigits === 79 ||
//     firstTwoDigits === 80;
//   if (isInNorth) {
//     return '1';
//   } else if (isInEast) {
//     return '2';
//   } else if (isInWest) {
//     return '3';
//   } else if (isInCentral) {
//     return '4';
//   } else if (isInNorthEast) {
//     return '5';
//   } else {
//     throw new RangeError('Invalid postalcode. Unable to get region from postalcode');
//   }
// };

interface HawkerCentreRow {
  name: string;
  address: string;
  regionId?: number;
  lat?: number;
  lng?: number;
}

const seedFile = path.resolve(__dirname, './seeds', 'hawkerCentre.csv');

async function updateRow(row: HawkerCentreRow) {
  const { address } = row;
  let { regionId, lat, lng } = row;

  // Only redo the computations if the fields are not present in the first place
  regionId = regionId || getRegionId(address);
  if (!lat || !lng) {
    const latLng = await geocode(address);
    lat = latLng.lat;
    lng = latLng.lng;
  }

  return {
    ...row,
    regionId,
    lat,
    lng,
  };
}

export const updateLatLngAndRegionId = async () => {
  const stream = fs.createReadStream(seedFile);
  const promises: Promise[] = [];

  try {
    await new Promise((resolve, reject) => {
      stream
        .pipe(csv.parse({ headers: ['name', 'address', 'regionId', 'lat', 'lng'] }))
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

          console.log("BYE");
          await Promise.all(promises)
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
    console.log(err, 'No update on HawkerCentre.csv');
  }
};

// export const updateLatLngAndRegionId = async () => {
//   const stream = fs.createReadStream(seedFile);
//   const promises: Promise[] = [];

//   try {
//     await new Promise((resolve, reject) => {
//       stream
//         .pipe(csv.parse({ headers: ['name', 'address', 'regionId', 'latLng'] }))
//         .on('error', error => {
//           reject(error);
//         })
//         .on('data', async row => {
//           promises.push(
//             new Promise(resolve => {
//               resolve(updateRow(row));
//             })
//           );
//         })
//         .on('end', async () => {
//           const ws = fs.createWriteStream(
//             path.resolve(__dirname, SEEDS_FILE_PATH, hawkerCentreFilename)
//           );

//           console.log("BYE");
//           await Promise.all(promises)
//             .then(updatedRows => {
//               csv
//                 .write(updatedRows)
//                 .pipe(ws)
//                 .on('finish', () => {
//                   resolve('Updated HawkerCentre.csv');
//                 });
//             })
//             .catch(error => {
//               reject(error);
//             });
//         });
//     });
//   } catch (err) {
//     if (err instanceof RangeError) {
//       throw err;
//     }
//     console.log(err, 'No update on HawkerCentre.csv');
//   }
// };
