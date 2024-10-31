import { coordinateToDmc, dmcToString, dmcToDecimal } from "./utils";
import { ICoordinates } from "./types";

/**
 * Convert lat, lng coordinates into DMC string.
 * Return an empty string if lat, lng object is not valid.
 * @param coordinates {lat, lng} coordinates object
 * @return DMC string
 */
export function toDMC(coordinates: ICoordinates) {
  if (!coordinates || !(coordinates.lat && coordinates.lng)) {
    throw new Error("You should provide a coordinates object {lat, lng}");
  }

  const { lat, lng } = coordinates;

  const north = lat > 0;
  const east = lng > 0;

  const lngDMC = coordinateToDmc(lng);
  const latDMC = coordinateToDmc(lat);

  const lngString = dmcToString(lngDMC);
  const latString = dmcToString(latDMC);

  return `${latString} ${north ? "N" : "S"} ${lngString} ${east ? "E" : "W"}`;
}

/**
 * Convert a DMC string (e.g.: 24° 30' 21cmin N 35° 10' 72cmin E) into a lat, lng object.
 * @param dmc DMC (degree, minute, centiminute) string
 * @return Promise<LatLng>
 */
export function toLatLng(dmc: string) {
  const regex: RegExp = /(\d+)[°\s]?\s?(\d+)[.\s]?\s?(\d+)['\s]?\s?([NSEW])?/i;
  const dmcLat = dmc.match(regex);

  if (!dmcLat) {
    throw new Error("Could not parse dmc string. Latitude part is invalid...");
  }

  // remove lat part from dmc string
  const dmcLngString = dmc.substring(dmcLat[0].length - 1).trim();
  const dmcLng = dmcLngString.match(regex);

  if (!dmcLng) {
    throw new Error("Could not parse dmc string. Longitude part is invalid...");
  }

  return {
    lat: dmcToDecimal(dmcLat),
    lng: dmcToDecimal(dmcLng),
  };
}
