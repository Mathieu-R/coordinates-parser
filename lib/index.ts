export interface LatLng {
  lat: number,
  lng: number
}

interface DMC {
  degrees: number,
  minutes: number,
  centiminutes: number
}

 /**
 * Convert lat, lng coordinates into DMC string.
 * Return an empty string if lat, lng object is not valid.
 * @param latlng 
 * @return DMC string
 */
export function toDMC (latlng: LatLng): string {
  // undefined
  if (!latlng) {
    return '';
  }

  // empty object
  if (Object.keys(latlng).length <= 0) {
    return '';
  }

  const {lat, lng} = latlng;

  // lat or lng is undefined
  if (lat === null || lng === null) {
    return '';
  }

  const north: boolean = lat > 0;
  const east: boolean = lng > 0;

  const lngDMC = parse(lng);
  const latDMC = parse(lat);

  const lngString = toString(lngDMC);
  const latString = toString(latDMC);

  return `${latString} ${north ? 'N' : 'S'} ${lngString} ${east ? 'E' : 'W'}`;
}

/**
 * Convert a DMC string (e.g.: 24° 30' 21cmin N 35° 10' 72cmin E) into a lat, lng object.
 * @param DMC a DMC (degree, minute, centiminute) string
 * @return Promise<LatLng>
 */
export function toLatLon (DMC: string): Promise<LatLng> {
  return new Promise((resolve, reject) => {
    const regex: RegExp = /(\d+)[°\s]?\s?(\d+)[.\s]?\s?(\d+)['\s]?\s?([NSEW])?/i;
    const lat = DMC.match(regex);

    if (!lat) reject('Could not parse dmc string... Lat part invalid.');

    // remove lat part from dmc string
    const lngString = DMC.substr(lat[0].length - 1).trim();
    const lng = lngString.match(regex);

    if (!lng) reject('Could not parse dmc string... Lng part invalid.');
    
    resolve({
      lat: toDecimal(lat),
      lng: toDecimal(lng)
    });
  });
}

function parse (coordinate: number): DMC {
  const degreesFloat: number = Math.abs(coordinate);
  const degreesInt: number = Math.floor(degreesFloat);

  const minutesFloat: number = (degreesFloat - degreesInt) * 60;
  const minutesInt: number = Math.floor(minutesFloat);

  const centiminutesFloat: number = (minutesFloat - minutesInt) * 100;
  const centiminutesInt: number = Math.floor(centiminutesFloat);

  return {
    degrees: degreesInt, 
    minutes: minutesInt, 
    centiminutes: centiminutesInt
  }
}

function toString ({degrees, minutes, centiminutes}: DMC): string {
  return `${degrees}° ${minutes}.${centiminutes}'`;
}

function toDecimal (dmcParts: RegExpMatchArray): number {
  const degrees = parseInt(dmcParts[1], 10);
  const minutes = parseInt(dmcParts[2], 10);
  const centiminutes = parseInt(dmcParts[3], 10);
  const hemisphere = dmcParts[4];
 
  if (!isInRange(degrees, 0, 180)) {
    throw Error('degrees are not in range [0, 180]');
  }

  if (!isInRange(minutes, 0, 60)) {
    throw Error('minutes are not in range [0, 60]');
  }

  if (!isInRange(centiminutes, 0, 100)) {
    throw Error('centiminutes are not in range [0, 100]');
  }

  let decimal: number = degrees + (minutes / 60) + centiminutes / 60 / 100;
  // keep 3 decimal, after that we loose precision
  decimal = Math.floor(decimal * 1000) / 1000;
  return hemisphere === 'N' || hemisphere === 'E' ? decimal : -decimal;
}

function isInRange (value: number, start: number, stop: number) {
  return (value >= start && value <= stop);
}