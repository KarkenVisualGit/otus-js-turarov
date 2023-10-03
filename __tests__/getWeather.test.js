import { getWeather } from "../src/functions/getWeather.js";

describe("getWeather", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            location: {
              name: "Test City",
              country: "Test Country",
            },
            current: {
              temp_c: 25,
              is_day: true,
              condition: {
                code: "test_code",
                icon: "test_icon.png",
              },
            },
          }),
      }),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call fetch with the correct URL", async () => {
    const city = "Test City";
    const url = "https://api.weatherapi.com/v1/current.json?key=";
    const expectedURL = `${url}a6a19c057af84c20ac380535230808&q=${city}`;

    await getWeather(city);

    expect(global.fetch).toHaveBeenCalledWith(expectedURL);
  });

  it("should return weather data for a city", async () => {
    const result = await getWeather("Test City");

    expect(result.location.name).toBe("Test City");
    expect(result.current.temp_c).toBe(25);
  });

  it("should handle fetch errors", async () => {
    global.fetch.mockRejectedValueOnce(new Error("API error"));

    let error;
    try {
      await getWeather("Test City");
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("API error");
  });
});
