import { getCurrentLocationAndWeather } from "../src/functions/getCurrentLocationAndWeather.js";
import { getCurrentLocation } from "../src/functions/getCurrentLocation.js";
import { getOpenWeather } from "../src/functions/getOpenWeather.js";
import { getWeather } from "../src/functions/getWeather.js";
import { showCard } from "../src/functions/showCard.js";
import { addCityClickListeners } from "../src/functions/addCityClickListeners.js";

jest.mock("../src/functions/getCurrentLocation.js");
jest.mock("../src/functions/getOpenWeather.js");
jest.mock("../src/functions/getWeather.js");
jest.mock("../src/functions/showCard.js");
jest.mock("../src/functions/addCityClickListeners.js");
jest.mock("../src/conditions.js", () => [
  {
    code: "test_code",
    languages: new Array(23).fill({}).concat([
      {
        day_text: "Sunny Day",
        night_text: "Starry Night",
      },
    ]),
  },
]);

describe("getCurrentLocationAndWeather", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch current location and display weather", async () => {
    getCurrentLocation.mockResolvedValue({ latitude: 40, longitude: -74 });
    getOpenWeather.mockResolvedValue({ name: "Test City" });
    getWeather.mockResolvedValue({
      location: { name: "Test City", country: "Test Country" },
      current: {
        temp_c: 25,
        is_day: true,
        condition: { code: "test_code", icon: "test_icon.png" },
      },
    });

    await getCurrentLocationAndWeather();

    expect(getCurrentLocation).toHaveBeenCalled();
    expect(getOpenWeather).toHaveBeenCalledWith(40, -74);
    expect(getWeather).toHaveBeenCalledWith("Test City");
    expect(showCard).toHaveBeenCalledWith({
      name: "Test City",
      country: "Test Country",
      temp: 25,
      condition: "Sunny Day",
      imgPath: "test_icon.png",
    });
    expect(addCityClickListeners).toHaveBeenCalled();
  });

  it("should handle errors gracefully", async () => {
    getCurrentLocation.mockRejectedValue(new Error("Location error"));

    await getCurrentLocationAndWeather();

    expect(getOpenWeather).not.toHaveBeenCalled();
    expect(getWeather).not.toHaveBeenCalled();
    expect(showCard).not.toHaveBeenCalled();
    expect(addCityClickListeners).not.toHaveBeenCalled();
  });
});
