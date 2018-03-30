const { toDMC, toLatLon } = require('./dist/coord-parser-cjs.js');

describe('[PARSING]', _ => {
  it('should parse decimal coordinates {lat, lng} to DMC (degrees, minutes, centiminues)', _ => {
    // Rixensart
    const coordinates = {
      lat: 50.711042, 
      lng: 4.533810
    };

    const DMC = toDMC(coordinates);
    console.log(DMC);
    expect(toDMC).toBe('');
  });

  it('should parse DMC (degrees, minutes, centiminues) to decimal coordinates {lat, lng}', async _ => {
    
  });
})