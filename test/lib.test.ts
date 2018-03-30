import { toDMC, toLatLon } from '../lib/index';

describe('[PARSING]', () => {
  it('should parse decimal coordinates {lat, lng} to DMC (degrees, minutes, centiminues)', () => {
    // Rixensart
    const coordinates = {
      lat: 50.711042, 
      lng: 4.533810
    };

    const dmc = toDMC(coordinates);
    expect(dmc).toBe(`50° 42.66' N 4° 32.2' E`);
  });

  it('should parse DMC (degrees, minutes, centiminues) to decimal coordinates {lat, lng}', async () => {
    const dmc = `50° 42.66' N 4° 32.2' E`;
    const latLon = await toLatLon(dmc);
    expect(latLon).toEqual({
      lat: 50.711, 
      lng: 4.533
    });
  });
});