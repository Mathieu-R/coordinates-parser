import { toDMC, toLatLon } from '../dist/coordinates-parser-cjs';

describe('[PARSING]', () => {
  it('should parse decimal coordinates {lat, lng} to DMC (degrees, minutes, centiminues)', () => {
    // Rixensart
    const coordinates = {
      lat: 50.711042, 
      lng: 4.533810
    };

    const DMC = toDMC(coordinates);
    console.log(DMC);
    expect(toDMC).toBe(`50° 42' 66cmin N 4° 32' 28cmin E`);
  });

  it('should parse DMC (degrees, minutes, centiminues) to decimal coordinates {lat, lng}', async () => {
    const DMC = `50° 42' 66cmin N 4° 32' 28cmin E`;
    const LatLon = await toLatLon(DMC);
    console.log(LatLon);
    expect(LatLon).toEqual({
      lat: 50.711042, 
      lng: 4.533810
    });
  });
});