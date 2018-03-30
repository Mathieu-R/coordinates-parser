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
 * convert lat, lng coordinates into DMC string
 * return an empty string if lat, lng object is not valid
 * @param latlng {lat, lng}
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

  const north = lat > 0;
  const east = lng > 0;

  const lngDMC = parse(lng);
  const latDMC = parse(lat);

  const lngString = toString(lngDMC);
  const latString = toString(latDMC);

  return `${latString} ${north ? 'N' : 'S'} ${lngString} ${east ? 'E' : 'W'}`;
}

/**
 * convert a DMC string (e.g.: 24° 30' 21cmin N 35° 10' 72cmin E) into a lat,lng object
 * @param DMC a DMC (degree, minute, centiminute) string
 * @return {lat, lng}
 */
export function toLatLon (DMC: string): Promise<LatLng> {
  return new Promise((resolve, reject) => {
    const regex = /([NSEW])?(-)?(\d+(?:\.\d+)?)[°º:d\s]?\s?(?:(\d+(?:\.\d+)?)['’‘′:]\s?(?:(\d{1,2}(?:\.\d+)?)(?:cmin)?)?)?\s?([NSEW])?/i;
    const match = DMC.match(regex);

    console.log(match);

    if (!match) reject('Could not parse dmc string...');

    resolve({
      lat: 0,
      lng: 0
    })
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
  return `${degrees}° ${minutes}' ${centiminutes}cmin`;
}