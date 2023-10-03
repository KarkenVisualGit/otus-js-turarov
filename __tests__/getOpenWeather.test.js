import { getOpenWeather } from "../src/functions/getOpenWeather.js";

describe("getOpenWeather", () => {
  beforeEach(() => {
    // Очистка моков перед каждым тестом
    jest.clearAllMocks();
  });

  it("should fetch weather data for given latitude and longitude", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ weather: "Sunny" }),
      }),
    );
    const latitude = 40.7128;
    const longitude = 74.006;
    const data = await getOpenWeather(latitude, longitude);
    const APIOPEN = "daaf5312cd361ce0a7f658ad53430535";
    const apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?" +
      `lat=${latitude}&lon=${longitude}&appid=${APIOPEN}`;
    expect(data.weather).toBe("Sunny");
    expect(fetch).toHaveBeenCalledWith(apiUrl);
  });

  it("should throw an error if API response is not ok", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: "API error",
      }),
    );

    await expect(getOpenWeather(40.7128, 74.006)).rejects.toThrow(
      "API error: API error",
    );
  });

  it("should throw an error if fetch fails", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Fetch failed")));

    await expect(getOpenWeather(40.7128, 74.006)).rejects.toThrow(
      "Fetch failed",
    );
  });
});
