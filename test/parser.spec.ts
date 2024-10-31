import { describe, test, expect } from "vitest";
import { toDMC, toLatLng } from "../src/index";

describe("Testing parsing functions", () => {
  test("should parse decimal coordinates {lat, lng} into DMC (degrees, minutes, centiminues)", () => {
    // Rixensart
    const coordinates = {
      lat: 50.711042,
      lng: 4.53381,
    };
    const dmc = toDMC(coordinates);

    expect(dmc).toBe(`50° 42.66' N 4° 32.2' E`);
  });

  test("should parse DMC (degrees, minutes, centiminues) into decimal coordinates {lat, lng}", () => {
    const dmc = `50° 42.66' N 4° 32.2' E`;
    const coordinates = toLatLng(dmc);

    expect(coordinates).toEqual({
      lat: 50.711,
      lng: 4.533,
    });
  });
});
