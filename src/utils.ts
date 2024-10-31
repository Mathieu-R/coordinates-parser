import { IDmc } from "./types";

export function coordinateToDmc(coordinate: number): IDmc {
  const degreesFloat = Math.abs(coordinate);
  const degreesInt = Math.floor(degreesFloat);

  const minutesFloat = (degreesFloat - degreesInt) * 60;
  const minutesInt = Math.floor(minutesFloat);

  const centiminutesFloat = (minutesFloat - minutesInt) * 100;
  const centiminutesInt = Math.floor(centiminutesFloat);

  return {
    degrees: degreesInt,
    minutes: minutesInt,
    centiminutes: centiminutesInt,
  };
}

export function dmcToString(dmc: IDmc): string {
  const { degrees, minutes, centiminutes } = dmc;
  return `${degrees}° ${minutes}.${centiminutes}'`;
}

export function dmcToDecimal(dmcParts: RegExpMatchArray) {
  const degrees = parseInt(dmcParts[1], 10);
  const minutes = parseInt(dmcParts[2], 10);
  const centiminutes = parseInt(dmcParts[3], 10);
  const hemisphere = dmcParts[4];

  if (!isInRange(degrees, 0, 180)) {
    throw new Error("degrees are not in range [0, 180]");
  }

  if (!isInRange(minutes, 0, 60)) {
    throw new Error("minutes are not in range [0, 60]");
  }

  if (!isInRange(centiminutes, 0, 100)) {
    throw new Error("centiminutes are not in range [0, 100]");
  }

  let decimal = degrees + minutes / 60 + centiminutes / 60 / 100;
  // keep 3 decimal, after that we loose precision
  decimal = Math.floor(decimal * 1000) / 1000;
  return hemisphere === "N" || hemisphere === "E" ? decimal : -decimal;
}

function isInRange(value: number, start: number, stop: number) {
  return value >= start && value <= stop;
}
