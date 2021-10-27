const { MapController } = require("./MapController");

describe("mapController .initMapSize tests", () => {
  test("initiating map size - throws", () => {
    const map = new MapController();
    expect(() => map.initMapSize(5, "w")).toThrow("invalid parameter");
    expect(() => map.initMapSize("F", 5)).toThrow("invalid parameter");
  });

  test("test initiating map size", () => {
    const map = new MapController();
    expect(map.initMapSize(5, 5)); // mock // throws
  });
});

describe("mapController .moveOutOfBounds tests", () => {
  test("checking out of bounds - throws", () => {
    const map = new MapController();

    expect(() => map.moveOutOfBounds(5, 5)).toThrow("MapController not initiated");
    map.initMapSize(5, 5);
    expect(() => map.moveOutOfBounds(0, "F")).toThrow("invalid parameter");
    expect(() => map.moveOutOfBounds({}, 4)).toThrow("invalid parameter");
  });

  test("checking out of bounds - true", () => {
    const map = new MapController();
    map.initMapSize(5, 5);
    expect(map.moveOutOfBounds(-1, 2)).toBe(true);
    expect(map.moveOutOfBounds(0, 40)).toBe(true);
  });

  test("checking out of bounds - false", () => {
    const map = new MapController();
    map.initMapSize(5, 5);
    expect(map.moveOutOfBounds(1, 2)).toBe(false);
    expect(map.moveOutOfBounds(0, 4)).toBe(false);
  });
});
