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

const DMC = `0° 52′ 43.93″ S 24° 26′ 0.93″ W`;

try {
  const {lat, lng} = await toLatLon(DMC);
} catch (err) {
  console.error(err);
}
```