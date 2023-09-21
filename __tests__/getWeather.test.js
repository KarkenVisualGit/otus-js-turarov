import { showError, getWeather } from "../src/main.js";
// Mock fetch для getWeather
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

describe("showError", () => {
  beforeEach(() => {
    document.body.innerHTML = ""; // Очистить HTML перед каждым тестом
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Must insert error message in DOM", () => {
    showError("Error!");
    const errorCard = document.querySelector(".card");
    expect(errorCard).toBeDefined();
    if (errorCard) {
      expect(errorCard.textContent).toContain("Ошибка!");
    }
  });
});

describe("getWeather", () => {
  it("Must call fetxh with correct URL", () => {
    const cityName = "London";
    const apikey = "a6a19c057af84c20ac380535230808";
    const expectedURL =
      "https://api.weatherapi.com/v1/current.json?key=" +
      `${apikey}&q=${cityName}`;

    getWeather(cityName);

    expect(fetch).toHaveBeenCalledWith(expectedURL);
  });

  it("Must return weather data", async () => {
    const cityName = "London";
    const fakeWeatherData = {
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
    };

    fetch.mockReturnValueOnce(
      Promise.resolve({
        json: () => Promise.resolve(fakeWeatherData),
      }),
    );

    const result = await getWeather(cityName);

    expect(result).toEqual(fakeWeatherData);
  });
});

// jest.mock('../src/main');

// import { getWeather, showCard, showCardByName } from '../src/main';

// describe('Your Test Suite', () => {
//     beforeEach(() => {
//         getWeather.mockClear();
//         showCard.mockClear();
//     });

//     it('should show card by name', async () => {
//         const fakeCityName = 'Berlin';

//         getWeather.mockResolvedValueOnce({
//             location: { name: 'Berlin', country: 'Germany' },
//             current: { temp_c: 20, condition:
//                      { code: 1000, icon: 'sample_icon_url' },
//                      is_day: true },
//         });

//         await showCardByName(fakeCityName);
//         expect(getWeather).toHaveBeenCalledWith(fakeCityName);
//         expect(showCard).toHaveBeenCalled();
//     });
// });
