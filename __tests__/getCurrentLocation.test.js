import { getCurrentLocation } from "../src/functions/getCurrentLocation.js";

describe("getCurrentLocation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve with coordinates when geolocation is successful", async () => {
    // Mock the geolocation
    global.navigator.geolocation = {
      getCurrentPosition: jest.fn().mockImplementation((success) =>
        Promise.resolve(
          success({
            coords: {
              latitude: 50,
              longitude: 30,
            },
          }),
        ),
      ),
    };

    const result = await getCurrentLocation();
    expect(result).toEqual({ latitude: 50, longitude: 30 });
  });

  it("should reject with an error when geolocation fails", async () => {
    // Mock the geolocation
    global.navigator.geolocation = {
      getCurrentPosition: jest
        .fn()
        .mockImplementation((success, failure) =>
          Promise.resolve(failure(new Error("Geolocation error"))),
        ),
    };

    await expect(getCurrentLocation()).rejects.toThrow("Geolocation error");
  });

  it("should reject if geolocation is not available", async () => {
    // Remove geolocation from navigator
    delete global.navigator.geolocation;

    await expect(getCurrentLocation()).rejects.toThrow();
  });
});
