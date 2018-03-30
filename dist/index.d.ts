export interface LatLng {
    lat: number;
    lng: number;
}
export interface DMC {
    degrees: number;
    minutes: number;
    centiminutes: number;
}
/**
* convert lat, lng coordinates into DMC string
* return an empty string if lat, lng object is not valid
* @param latlng {lat, lng}
* @return DMC string
*/
export declare function toDMC(latlng: LatLng): string;
/**
 * convert a DMC string (e.g.: 24° 30' 21cmin N 35° 10' 72cmin E) into a lat,lng object
 * @param DMC a DMC (degree, minute, centiminute) string
 * @return {lat, lng}
 */
export declare function toLatLon(DMC: string): Promise<LatLng>;
