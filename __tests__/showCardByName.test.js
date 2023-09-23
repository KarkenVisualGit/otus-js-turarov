import { showCardByName } from "../src/functions/showCardByName.js";
import { getWeather } from "../src/functions/getWeather.js";
import { showCard } from "../src/functions/showCard.js";
import { removecard } from "../src/functions/removeCard.js";

jest.mock("../src/functions/getWeather.js");
jest.mock("../src/functions/showCard.js");
jest.mock("../src/functions/removeCard.js");
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

describe("showCardByName", () => {
  beforeEach(() => {
    // Очистка всех моков перед каждым тестом
    jest.clearAllMocks();
    document.body.innerHTML = ""; // очищаем содержимое body
  });

  it("should get weather data, show card and remove existing card for new city", async () => {
    getWeather.mockResolvedValue({
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
    });

    await showCardByName("Test City");

    expect(getWeather).toHaveBeenCalledWith("Test City");
    expect(showCard).toHaveBeenCalled();
    expect(removecard).toHaveBeenCalled();
  });

  it("should not call getWeather or showCard if city already exists", async () => {
    // Создаем фейковый город в DOM
    const existingCity = document.createElement("div");
    existingCity.classList.add("card-city");
    existingCity.textContent = "Existing City";
    document.body.appendChild(existingCity);

    await showCardByName("Existing City");

    expect(getWeather).not.toHaveBeenCalled();
    expect(showCard).not.toHaveBeenCalled();
  });

  it("should throw error if condition info is missing", async () => {
    getWeather.mockResolvedValue({
      location: {
        name: "Test City",
        country: "Test Country",
      },
      current: {
        temp_c: 25,
        is_day: true,
        condition: {
          code: "missing_code",
          icon: "test_icon.png",
        },
      },
    });

    await expect(showCardByName("Test City")).rejects.toThrow(
      "Unable to find condition info.",
    );
  });
});
