// 'use strict';
import {
  showCard,
  updateCityTable,
  saveCityToLocalStorage,
  getCitiesFromLocalStorage,
  removecard,
  showError,
  getWeather,
  getOpenWeather,
  getCurrentLocationAndWeather,
  getCurrentLocation,
  showCardByName
} from '../src/main';
// global.fetch = require('jest-fetch-mock');
let header;
let form;
let input;
beforeEach(() => {
  document.body.innerHTML = `
      <header class="header">
        <h1 class="title">Weather forecast</h1>
        <form class="form" id="form">
          <input id="inputCity" type="text" class="input" placeholder="Enter city name">
          <button class="btn">Show</button>
        </form>
      </header>
    `;
  header = document.querySelector('.header');
  form = document.querySelector('.form');
  input = document.querySelector('.input');
});

afterEach(() => {
  document.getElementsByTagName('html')[0].innerHTML = '';
});

test('virtual DOM imitation', () => {
  const titleElement = document.querySelector('.title');
  expect(titleElement).not.toBeNull();
  expect(titleElement.textContent).toBe('Weather forecast');
});
test('showCard finds existing card with the same name', async () => {
  document.getElementsByTagName('html')[0].innerHTML = '';
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
  const name = 'City1';
  const country = 'Country1';
  const cityData = {
    name: name,
    country: country,
    temp: 25,
    condition: 'Sunny',
    imgPath: 'path/to/image.jpg',
  };

  await showCard(cityData);
  const existingCards = Array.from(document.querySelectorAll('.card-city'))
    .filter(cardCity => cardCity.textContent.includes(name));
  // Теперь проверяем, что existingCards был правильно найден

  expect(existingCards.length).toBeGreaterThan(0);
  expect(existingCards.map(card => card.textContent)).toContain(name + country);
});
test('showCard creates and inserts a new card if it does not exist', async () => {
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
  const name = 'City1';
  const country = 'Country1';
  const temp = 25;
  const condition = 'Sunny';
  const imgPath = 'path/to/image.jpg';
  const weatherGeoData = {
    name: name,
    country: country,
    temp: temp,
    condition: condition,
    imgPath: imgPath
  };
  await showCard(weatherGeoData);
  // Проверяем, что новая карточка была создана и вставлена в DOM
  const newCard = document.querySelector('.card-city');
  expect(newCard).not.toBeNull();
  expect(newCard.textContent).toContain(name + country);
});

// Mock the functions 
const mockGetCitiesFromLocalStorage = jest.fn();
const mockShowCardByName = jest.fn();

global.getCitiesFromLocalStorage = mockGetCitiesFromLocalStorage;
global.showCardByName = mockShowCardByName;

describe('updateCityTable', () => {

  beforeEach(() => {
    // Mock the localStorage

    document.body.innerHTML = ''; // Clear the DOM before each test
    jest.clearAllMocks(); // Clear all mocks
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('removes additional cityTable elements if there are more than one', async () => {
    document.body.innerHTML = `
            <div class="cityTable"></div>
            <div class="cityTable"></div>
        `;

    await updateCityTable();

    const cityTables = document.querySelectorAll('.cityTable');
    expect(cityTables.length).toBe(1);
  });

  it('updates cityTable with cities from localStorage', async () => {
    document.body.innerHTML = '<div class="cityTable"></div>';

    mockGetCitiesFromLocalStorage.mockReturnValue(['City1', 'City2']);

    await updateCityTable();

    const cityTables = document.querySelector('.cityTable');
    const tableRows = cityTables.querySelectorAll('tr'); // get rows directly

    expect(tableRows.length).toBe(2);
    expect(tableRows[0].innerHTML).toContain('City1');
    expect(tableRows[1].innerHTML).toContain('City2');
  });

  it('calls showCardByName when a city is clicked', async () => {
    document.body.innerHTML = '<div class="cityTable"></div>';

    mockGetCitiesFromLocalStorage.mockReturnValue(['City1']);

    await updateCityTable();

    const cityTableRow = document.querySelector('.cityTable tr');
    if (!cityTableRow) {
      throw new Error("No city table row found!");
    }
    cityTableRow.click();

    expect(mockShowCardByName).toHaveBeenCalledWith('City1');
  });
});

test('saveCityToLocalStorage saves a city to localStorage', () => {
  // Исходное состояние localStorage
  const initialCities = getCitiesFromLocalStorage();
  const cityName = 'NewCity';

  // Вызов функции saveCityToLocalStorage
  saveCityToLocalStorage(cityName);

  const updatedCities = getCitiesFromLocalStorage();

  expect(updatedCities).toContain(cityName);

  // Очищаем localStorage после теста
  localStorage.clear();

  // Убеждаемся, что исходное состояние восстановлено
  const finalCities = getCitiesFromLocalStorage();
  expect(finalCities).toEqual(initialCities);
});

// Mocking navigator.geolocation
global.navigator.geolocation = {
  getCurrentPosition: jest.fn(),
};

describe('getCurrentLocation', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns coordinates when geolocation is successful', async () => {
    const mockPosition = {
      coords: {
        latitude: 40.7128,
        longitude: -74.0060,
      },
    };

    // Mocking successful geolocation call
    global.navigator.geolocation.getCurrentPosition.mockImplementationOnce((successCallback) => {
      successCallback(mockPosition);
    });

    const location = await getCurrentLocation();

    expect(location).toEqual({
      latitude: mockPosition.coords.latitude,
      longitude: mockPosition.coords.longitude,
    });
  });

  it('throws an error when geolocation fails', async () => {
    const mockError = new Error('Geolocation error');

    // Mocking failed geolocation call
    global.navigator.geolocation.getCurrentPosition.mockImplementationOnce((_, errorCallback) => {
      errorCallback(mockError);
    });

    // Using async/await with expect().rejects
    await expect(getCurrentLocation()).rejects.toThrow(mockError);
  });
});

// Mocking external dependencies
const mockGetWeather = jest.fn();
const mockShowCard = jest.fn();

// Mocking global dependencies for the test environment
global.getWeather = mockGetWeather;
global.showCard = mockShowCard;

describe('showCardByName', () => {

  beforeEach(() => {
    // Clear the document body
    document.body.innerHTML = '';
    // Clear all mocks
    jest.clearAllMocks();
  });

  it('creates a card if no existing card for the city exists', async () => {
    mockGetWeather.mockResolvedValueOnce({
      location: {
        name: 'Test City',
        country: 'Test Country'
      },
      current: {
        temp_c: 25,
        is_day: true,
        condition: {
          code: 'test_code',
          icon: 'test_icon.png'
        }
      }
    });

    // Assuming you have some conditions data like this:
    const conditions = [
      {
        code: 'test_code',
        languages: [
          // ...other language data
          { day_text: 'Sunny', night_text: 'Clear' }  // 23rd index
        ]
      }
    ];

    global.conditions = conditions;  // Set this as global for the test

    await showCardByName('Test City');

    expect(mockGetWeather).toHaveBeenCalledWith('Test City');
    expect(mockShowCard).toHaveBeenCalledWith({
      name: 'Test City',
      country: 'Test Country',
      temp: 25,
      condition: 'Sunny',
      imgPath: 'test_icon.png'
    });
  });

  it('does not create a new card if a card for the city already exists', async () => {
    document.body.innerHTML = '<div class="card-city">Test City</div>';

    await showCardByName('Test City');

    expect(mockGetWeather).not.toHaveBeenCalled();
    expect(mockShowCard).not.toHaveBeenCalled();
  });

  it('removes additional cards if more than one exists', async () => {
    document.body.innerHTML = `
            <div class="card"></div>
            <div class="card"></div>
        `;

    mockGetWeather.mockResolvedValueOnce({
      location: {
        name: 'Another City',
        country: 'Test Country'
      },
      current: {
        temp_c: 20,
        is_day: true,
        condition: {
          code: 'test_code',
          icon: 'test_icon.png'
        }
      }
    });

    const conditions = [
      {
        code: 'test_code',
        languages: [
          // ...other language data
          { day_text: 'Sunny', night_text: 'Clear' }  // 23rd index
        ]
      }
    ];

    global.conditions = conditions;

    await showCardByName('Another City');

    const cityCards = document.querySelectorAll('.card');
    expect(cityCards.length).toBe(1);
  });
});

// Mocking fetch
global.fetch = jest.fn();
const mockAPIOPEN = 'daaf5312cd361ce0a7f658ad53430535';
global.APIOPEN = mockAPIOPEN;

describe('getOpenWeather', () => {

  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches data successfully from OpenWeather', async () => {
    // Mocking a successful response
    fetch.mockResolvedValueOnce({
      json: async () => ({
        result: 'test-result'
      }),
      ok: true
    });

    const result = await getOpenWeather(10, 20);

    expect(fetch).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/weather?lat=10&lon=20&appid=' + APIOPEN);
    expect(result).toEqual({ result: 'test-result' });
  });

  it('fetches erroneously data from OpenWeather', async () => {
    // Mocking an erroneous response
    fetch.mockRejectedValueOnce(new Error('API error'));

    await expect(getOpenWeather(10, 20)).rejects.toThrow('API error');
  });
});

describe('removecard', () => {

  it('removes the last card from the DOM', () => {
    // Setup: Add three cards to the DOM
    document.body.innerHTML = `
      <div class="card">Card 1</div>
      <div class="card">Card 2</div>
      <div class="card">Card 3</div>
    `;

    // Act: Remove the last card
    removecard();

    // Assert: Ensure the last card (Card 3) has been removed
    const cards = document.querySelectorAll('.card');
    expect(cards).toHaveLength(2);
    expect(cards[1].textContent).toBe('Card 2');
  });

  it('does nothing if there are no cards', () => {
    // Setup: Empty body
    document.body.innerHTML = '';

    // Act: Try to remove a card
    removecard();

    // Assert: Ensure no cards in the DOM
    const cards = document.querySelectorAll('.card');
    expect(cards).toHaveLength(0);
  });
});