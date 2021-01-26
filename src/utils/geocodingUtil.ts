import { Client } from '@googlemaps/google-maps-services-js';
import { GMAPS_API_KEY } from '../consts';

const client = new Client({});

export async function geocode(address: string) {
  const resp = await client.geocode({ params: { address, key: GMAPS_API_KEY } });
  return resp.data.results[0].geometry.location;
}

/*
RegionId | Region | first 2 digits of postal code
1 | North | 72-73 && 77-78 && 75-76
2 | East | 46-52 && 81
3 | West | 60-71
4 | Central | 01-45 && 58-59
5 | NorthEast | 53-57 && 79-80
*/

// This requires region to be initialised in the correct order.
export function getRegionId(address: string) {
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
    return 1;
  } else if (isInEast) {
    return 2;
  } else if (isInWest) {
    return 3;
  } else if (isInCentral) {
    return 4;
  } else if (isInNorthEast) {
    return 5;
  } else {
    throw new RangeError('Invalid postalcode. Unable to get region from postalcode');
  }
}
