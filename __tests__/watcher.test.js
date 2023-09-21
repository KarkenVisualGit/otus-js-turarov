// 'use strict';
import {
  showCard,
  updateCityTable,
  saveCityToLocalStorage,
  getCitiesFromLocalStorage,
  removecard,
  getOpenWeather,
  getCurrentLocation,
  showCardByName,
} from "../src/main.js";
// import { fireEvent } from "@testing-library/dom";
// import conditions from "../src/conditions.js";
// import { waitFor } from "@testing-library/dom";
// import { screen } from "@testing-library/dom";
// global.fetch = require('jest-fetch-mock');
// Mocking fetch
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
describe("Test DOM", () => {
  // let header = document.querySelector(".header");
  // let form = document.querySelector(".form");
  // let input = document.querySelector(".input");

  beforeEach(() => {
    document.body.innerHTML = `
      <header class="header">
        <h1 class="title">Weather forecast</h1>
        <form class="form" id="form">
          <input id="inputCity" type="text" 
          class="input" placeholder="Enter city name">
          <button class="btn">Show</button>
        </form>
      </header>
    `;
  });

  afterEach(() => {
    document.getElementsByTagName("html")[0].innerHTML = "";
  });

  test("virtual DOM imitation", () => {
    const titleElement = document.querySelector(".title");
    expect(titleElement).not.toBeNull();
    expect(titleElement.textContent).toBe("Weather forecast");
  });
  test("showCard finds existing card with the same name", async () => {
    document.getElementsByTagName("html")[0].innerHTML = "";
    document.body.innerHTML = `
    <div>
      <div class="card">
        <h2 class="card-city">City1<span>Country1</span></h2>
      </div>
      <div class="card">
        <h2 class="card-city">City2<span>Country2</span></h2>
      </div>
    </div>
  `;
    const name = "City1";
    const country = "Country1";
    const cityData = {
      name,
      country,
      temp: 25,
      condition: "Sunny",
      imgPath: "path/to/image.jpg",
    };

    showCard(cityData);
    const existingCards = Array.from(
      document.querySelectorAll(".card-city"),
    ).filter((cardCity) => cardCity.textContent.includes(name));

    expect(existingCards.length).toBeGreaterThan(0);
    expect(existingCards.map((card) => card.textContent)).toContain(
      name + country,
    );
  });
  test("showCard creates and inserts a new card", async () => {
    // document.getElementsByTagName('html')[0].innerHTML = '';
    document.body.innerHTML = `
    <div>
      <div class="card">
        <h2 class="card-city">City1<span>Country1</span></h2>
      </div>
      <div class="card">
        <h2 class="card-city">City2<span>Country2</span></h2>
      </div>
    </div>
  `;
    const name = "City1";
    const country = "Country1";
    const temp = 25;
    const condition = "Sunny";
    const imgPath = "path/to/image.jpg";
    const weatherGeoData = {
      name,
      country,
      temp,
      condition,
      imgPath,
    };
    showCard(weatherGeoData);

    const newCard = document.querySelector(".card-city");
    expect(newCard).not.toBeNull();
    expect(newCard.textContent).toContain(name + country);
  });
});

// Mock the functions
const mockGetCitiesFromLocalStorage = jest.fn();
const mockShowCardByName = jest.fn();

global.getCitiesFromLocalStorage = mockGetCitiesFromLocalStorage;
global.showCardByName = mockShowCardByName;

describe("updateCityTable", () => {
  beforeEach(() => {
    // Mock the localStorage

    document.body.innerHTML = ""; // Clear the DOM before each test
    jest.clearAllMocks(); // Clear all mocks
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("removes additional cityTable elements more than one", async () => {
    document.body.innerHTML = `
            <div class="cityTable"></div>
            <div class="cityTable"></div>
        `;

    updateCityTable();

    const cityTables = document.querySelectorAll(".cityTable");
    expect(cityTables).toHaveLength(1);
  });

  // it('updates cityTable with cities from localStorage', async () => {
  //   document.body.innerHTML = '<div class="cityTable"></div>';

  //   mockGetCitiesFromLocalStorage.mockReturnValue(['City1', 'City2']);

  //   updateCityTable();

  //   const cityTables = document.querySelector('.cityTable');
  //   const tableRows = cityTables.querySelectorAll('tr'); // get rows directly

  //   expect(tableRows.length).toBe(2);
  //   expect(tableRows[0].innerHTML).toContain('City1');
  //   expect(tableRows[1].innerHTML).toContain('City2');
  // });

  // it('calls showCardByName when a city is clicked', async () => {
  //   document.body.innerHTML = '<div class="cityTable"></div>';

  //   mockGetCitiesFromLocalStorage.mockReturnValue(['City1']);

  //   await updateCityTable();

  //   const cityTableRow = document.querySelector('.cityTable tr');
  //   if (!cityTableRow) {
  //     throw new Error("No city table row found!");
  //   }
  //   cityTableRow.click();

  //   expect(mockShowCardByName).toHaveBeenCalledWith('City1');
  // });
});

test("saveCityToLocalStorage saves a city to localStorage", () => {
  const initialCities = getCitiesFromLocalStorage();
  const cityName = "NewCity";

  saveCityToLocalStorage(cityName);

  const updatedCities = getCitiesFromLocalStorage();

  expect(updatedCities).toContain(cityName);

  localStorage.clear();

  const finalCities = getCitiesFromLocalStorage();
  expect(finalCities).toEqual(initialCities);
});

// Mocking navigator.geolocation
global.navigator.geolocation = {
  getCurrentPosition: jest.fn(),
};

describe("getCurrentLocation", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns coordinates when geolocation is successful", async () => {
    const mockPosition = {
      coords: {
        latitude: 40.7128,
        longitude: -74.006,
      },
    };

    // Mocking successful geolocation call
    global.navigator.geolocation.getCurrentPosition.mockImplementationOnce(
      (successCallback) => {
        successCallback(mockPosition);
      },
    );

    const location = await getCurrentLocation();

    expect(location).toEqual({
      latitude: mockPosition.coords.latitude,
      longitude: mockPosition.coords.longitude,
    });
  });

  it("throws an error when geolocation fails", async () => {
    const mockError = new Error("Geolocation error");

    // Mocking failed geolocation call
    global.navigator.geolocation.getCurrentPosition.mockImplementationOnce(
      (_, errorCallback) => {
        errorCallback(mockError);
      },
    );

    // Using async/await with expect().rejects
    await expect(getCurrentLocation()).rejects.toThrow(mockError);
  });
});

// Mocking external dependencies
const mockGetWeather = jest.fn();
const mockShowCard = jest.fn();

// Mocking global dependencies for the test environment
global.getWeather = mockGetWeather;
global.shshowCard = mockShowCard;

describe("showCardByName", () => {
  beforeEach(() => {
    // Clear the document body
    document.body.innerHTML = "";
    // Clear all mocks

    jest.clearAllMocks();
  });

  // it('creates a card if no existing card for the city exists', async () => {
  //   mockGetWeather.mockResolvedValueOnce({
  //     location: {
  //       name: 'Test City',
  //       country: 'Test Country'
  //     },
  //     current: {
  //       temp_c: 25,
  //       is_day: true,
  //       condition: {
  //         code: 'test_code',
  //         icon: 'test_icon.png'
  //       }
  //     }
  //   });

  //   global.conditions = conditions;
  //   await showCardByName('Test City');

  //   expect(mockGetWeather).toHaveBeenCalledWith('Test City');
  //   expect(mockShowCard).toHaveBeenCalledWith({
  //     name: 'Test City',
  //     country: 'Test Country',
  //     temp: 25,
  //     condition: 'Sunny',
  //     imgPath: 'test_icon.png'
  //   });
  // });

  it("does not create a new card if a card exists", async () => {
    document.body.innerHTML = "<div class=\"card-city\">Test City</div>";

    await showCardByName("Test City");

    expect(mockGetWeather).not.toHaveBeenCalled();
    expect(mockShowCard).not.toHaveBeenCalled();
  });

  // it('removes additional cards if more than one exists', async () => {
  //   document.body.innerHTML = `
  //           <div class="card"></div>
  //           <div class="card"></div>
  //       `;

  //   mockGetWeather.mockResolvedValueOnce({
  //     location: {
  //       name: 'Another City',
  //       country: 'Test Country'
  //     },
  //     current: {
  //       temp_c: 20,
  //       is_day: true,
  //       condition: {
  //         code: 'test_code',
  //         icon: 'test_icon.png'
  //       }
  //     }
  //   });

  //   global.conditions = conditions;

  //   await showCardByName('Another City');

  //   const cityCards = document.querySelectorAll('.card');
  //   expect(cityCards.length).toBe(1);
  // });
});

const mockAPIOPEN = "daaf5312cd361ce0a7f658ad53430535";
global.APIOPEN = mockAPIOPEN;

describe("getOpenWeather", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("fetches data successfully from OpenWeather", async () => {
    // Mocking a successful response
    fetch.mockResolvedValueOnce({
      json: async () => ({
        result: "test-result",
      }),
      ok: true,
    });

    const result = await getOpenWeather(10, 20);
    const APIOPEN = "daaf5312cd361ce0a7f658ad53430535";
    expect(fetch).toHaveBeenCalledWith(
      "https://api.openweathermap.org/data/2.5/weather?" +
        `lat=10&lon=20&appid=${APIOPEN}`,
    );
    expect(result).toEqual({ result: "test-result" });
  });

  it("fetches erroneously data from OpenWeather", async () => {
    // Mocking an erroneous response
    fetch.mockRejectedValueOnce(new Error("API error"));

    await expect(getOpenWeather(10, 20)).rejects.toThrow("API error");
  });
});

describe("removecard", () => {
  it("removes the last card from the DOM", () => {
    // Setup: Add three cards to the DOM
    document.body.innerHTML = `
      <div class="card">Card 1</div>
      <div class="card">Card 2</div>
      <div class="card">Card 3</div>
    `;

    // Act: Remove the last card
    removecard();

    // Assert: Ensure the last card (Card 3) has been removed
    const cards = document.querySelectorAll(".card");
    expect(cards).toHaveLength(2);
    expect(cards[1].textContent).toBe("Card 2");
  });

  it("does nothing if there are no cards", () => {
    // Setup: Empty body
    document.body.innerHTML = "";

    // Act: Try to remove a card
    removecard();

    // Assert: Ensure no cards in the DOM
    const cards = document.querySelectorAll(".card");
    expect(cards).toHaveLength(0);
  });
});

// describe("Testing showCard", () => {
//   beforeEach(() => {
//     document.body.innerHTML = `
//     <header class="header">
//         <h1 class="title">Weather forecast</h1>
//         <form class="form" id="form">
//             <input id="inputCity" type="text" class="input" placeholder="Enter city name" />
//             <button class="btn">Show</button>
//         </form>
//     </header>
//   `;
//   });

//   afterEach(() => {
//     document.getElementsByTagName("html")[0].innerHTML = "";
//   });

//   test('it renders a card correctly', () => {
//     const testData = {
//       name: 'London',
//       country: 'UK',
//       temp: '15',
//       condition: 'Cloudy',
//       imgPath: 'path_to_weather_image.png',
//     };

//     showCard(testData);

//     const cardCity = document.querySelector('.card-city');
//     expect(cardCity).not.toBeNull();
//     expect(cardCity.textContent).toBe('LondonUK');

//     const cardValue = document.querySelector('.card-value');
//     expect(cardValue.textContent).toBe('15°C');

//     const cardImg = document.querySelector('.card-img');
//     expect(cardImg.getAttribute('src')).toBe('path_to_weather_image.png');

//     // и так далее, можно добавить больше проверок на основе testData
//   });
// });

// const mockAPI = 'daaf5312cd361ce0a7f658ad53430535';
// global.API = mockAPI;
// describe('getWeather', () => {

//   beforeEach(() => {
//     // Reset the mock before each test
//     fetch.mockClear();
//     // fetch.resetMocks();
//   });

//   it('fetches weather data for the given city', async () => {
//     fetch.mockResponseOnce(JSON.stringify({
//       location: {
//         name: 'Test City',
//         country: 'Test Country'
//       },
//       current: {
//         temp_c: 25,
//         is_day: true,
//         condition: {
//           code: 'test_code',
//           icon: 'test_icon.png'
//         }
//       }
//     }));
//     const result = await getWeather('Test City');

//     expect(global.fetch).toHaveBeenCalledTimes(1);

//     expect(result).toEqual({
//       location: {
//         name: 'Test City',
//         country: 'Test Country'
//       },
//       current: {
//         temp_c: 25,
//         is_day: true,
//         condition: {
//           code: 'test_code',
//           icon: 'test_icon.png'
//         }
//       }
//     });
//   });

//   it('throws an error when the request fails', async () => {
//     fetch.mockImplementationOnce(() => Promise.reject("API is down"));
//     const result = await getWeather('Test City');
//     // global.fetch.mockRejectedValueOnce(new Error('API error'));;

//     expect(result).toEqual(null);
//     expect(fetch).toHaveBeenCalledWith(
//       `https://api.weatherapi.com/v1/current.json?key=${API}&q="TestCity"`
//     );

//   });
// });

// Mock the getWeather function since we don't want to make actual API calls
// jest.mock('../src/main', () => ({
//   ...jest.requireActual('../src/main'),
//   getWeather: jest.fn(),
// }));

// describe('Form submission', () => {
//   let form, input;

//   beforeEach(() => {
//     document.body.innerHTML = `
//             <div class="form">
//                 <input class="input" type="text" />
//             </div>
//         `;

//     form = document.querySelector('.form');
//     input = document.querySelector('.input');
//     require('../src/main'); // To bind the onsubmit event to the form
//   });

//   it('should handle error response correctly', async () => {
//     const mockData = {
//       error: {
//         message: 'City not found'
//       }
//     };

//     getWeather.mockResolvedValueOnce(mockData);

//     input.value = 'FakeCity';
//     fireEvent.submit(form);

//     expect(document.querySelector('.card')
//    .textContent).toBe(mockData.error.message);
//   });

//   it('should display weather data correctly', async () => {
//     const mockData = {
//       location: {
//         name: 'TestCity',
//         country: 'TestCountry'
//       },
//       current: {
//         temp_c: 25,
//         condition: {
//           code: 1000, // assume this code exists in conditions.js
//           icon: 'test-icon.png'
//         },
//         is_day: true
//       }
//     };

//     const expectedCondition = conditions.find((element) =>
//    element.code === mockData.current.condition.code);

//     getWeather.mockResolvedValueOnce(mockData);

//     input.value = 'TestCity';
//     fireEvent.submit(form);

//     await waitFor(() => {
//       const card = document.querySelector('.card-city');
//       expect(card).toHaveTextContent('TestCity');
//       expect(card.querySelector('span')).toHaveTextContent('TestCountry');
//     });

//   });
// });
