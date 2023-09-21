import {
  saveCityToLocalStorage,
  getCitiesFromLocalStorage,
} from "../src/main.js";
// import { screen } from "@testing-library/dom";

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
beforeEach(() => {
  fetch.mockClear();
});
// Mock localStorage
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
      return store[key];
    },
    clear: () => {
      store = {};
      return store;
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

// Mocking document.querySelector/querySelectorAll
document.querySelectorAll = jest.fn((selector) => {
  if (selector === ".cityTable") {
    return [];
  }
  if (selector === ".card-city") {
    return [];
  }
  return [];
});

describe("Weather App", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    document.querySelectorAll.mockClear();
    localStorage.clear();
  });

  it("should save city to localStorage", () => {
    saveCityToLocalStorage("Berlin");
    expect(JSON.parse(localStorage.getItem("cities"))).toContain("Berlin");
  });

  it("should get cities from localStorage", () => {
    const cities = ["Berlin", "Paris"];
    localStorage.setItem("cities", JSON.stringify(cities));
    const retrievedCities = getCitiesFromLocalStorage();
    expect(retrievedCities).toEqual(cities);
  });

  // it("should update city table", async () => {
  //   const mockCityTable = {
  //     innerHTML: "",
  //     appendChild: jest.fn(),
  //   };
  //   document.querySelectorAll.mockReturnValueOnce([mockCityTable]);
  //   const cities = ["Berlin"];
  //   localStorage.setItem("cities", JSON.stringify(cities));
  //   updateCityTable();
  //   expect(mockCityTable.appendChild).toHaveBeenCalledTimes(1);
  // });

  // it('should show card by name', async () => {
  //     const fakeCityName = 'Berlin';
  //     const mockGetWeather = jest.fn();
  //     mockGetWeather.mockResolvedValueOnce({
  //         location: { name: 'Berlin', country: 'Germany' },
  //         current: { temp_c: 20, condition:
  //         { code: 1000, icon: 'sample_icon_url' }, is_day: true },
  //     });
  //     const mockShowCard = jest.fn();

  //     // Assume getWeather and showCard are imported from some other module
  //     jest.mock('../src/main', () => ({
  //         getWeather: mockGetWeather,
  //         showCard: mockShowCard,
  //     }));

  //     await showCardByName(fakeCityName);
  //     expect(mockGetWeather).toHaveBeenCalledWith(fakeCityName);
  //     expect(mockShowCard).toHaveBeenCalled();
  // });
});
