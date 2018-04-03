[![Build Status](https://travis-ci.org/Mathieu-R/coordinates-parser.svg?branch=master)](https://travis-ci.org/Mathieu-R/coordinates-parser)

[![codecov](https://codecov.io/gh/Mathieu-R/coordinates-parser/branch/master/graph/badge.svg)](https://codecov.io/gh/Mathieu-R/coordinates-parser)

[![npm version](https://badge.fury.io/js/coordinates-parser.svg)](https://badge.fury.io/js/coordinates-parser)

# coordinates-parser
parse coordinates (lat, lon) into DMC (degree, minute, centiminute) and vice versa.

Usage:
```
npm i coordinates-parser
```

```js
import { toDmc } from 'coordinates-parser';

const coordinates = {
  lat: 50.711042, 
  lng: 4.533810
};

const DMC = toDMC(coordinates);
```

```js
import { toLatLon } from 'coordinates-parser';

const DMC = `0° 52.43' S 24° 26.1' W`;

try {
  const {lat, lng} = await toLatLon(DMC);
} catch (err) {
  console.error(err);
}
```