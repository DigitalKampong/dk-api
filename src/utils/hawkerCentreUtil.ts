import { HawkerCentre } from '../models';

export function isHawkerCentreClosed(hawkerCentre: HawkerCentre) {
  const closeStart = hawkerCentre.closeStart;
  const closeEnd = hawkerCentre.closeEnd;

  let isClosed = false;
  if (closeStart && closeEnd) {
    const currDate = new Date();
    isClosed = currDate >= closeStart && currDate <= closeEnd;
  }
  return isClosed;
}
