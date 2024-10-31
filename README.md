[![codecov](https://codecov.io/gh/Mathieu-R/coordinates-parser/branch/master/graph/badge.svg)](https://codecov.io/gh/Mathieu-R/coordinates-parser)

[![npm version](https://badge.fury.io/js/coordinates-parser.svg)](https://badge.fury.io/js/coordinates-parser)

# coordinates-parser

parse coordinates (lat, lon) into dmc (degree, minute, centiminute) and vice versa.

Usage:

```
pnpm add coordinates-parser
```

```js
import { toDmc } from "coordinates-parser";

const coordinates = {
  lat: 50.711042,
  lng: 4.53381,
};

// 50° 42.66' N 4° 32.2' E
const DMC = toDMC(coordinates);
```

```js
import { toLatLng } from "coordinates-parser";

const DMC = `50° 42.66' N 4° 32.2' E`;

// { lat: 50.711042, lng: 4.533810 }
const coordinates = toLatLng(DMC);
```
