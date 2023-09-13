// 'use strict';
import {
  showCard,
  // updateCityTable,
  saveCityToLocalStorage,
  getCitiesFromLocalStorage,
  // removecard,
  // showError,
  // getWeather,
  // getOpenWeather,
  // getCurrentLocationAndWeather,
  // getCurrentLocation,
  // showCardByName
} from '../src/main';
// import { JSDOM } from 'jsdom';
// const { JSDOM } = require("jsdom");
// const { JSDOM } = jsdom;
// import { TextEncoder } from 'text-encoding';
// global.TextEncoder = TextEncoder;
// let window;
// let document;
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
  // window = dom.window;
  // document = window.document;
  header = document.querySelector('.header');
  form = document.querySelector('#form');
  input = document.querySelector('#inputCity');
});

// afterEach(() => {
//   document.getElementsByTagName('html')[0].innerHTML = '';
// });

test('showCard function', () => {
  const titleElement = document.querySelector('.title');
  expect(titleElement).not.toBeNull();
  expect(titleElement.textContent).toBe('Weather forecast');
});
test('showCard finds existing card with the same name', () => {
  const name = 'City1';
  const country = 'Country1';
  const cityData = {
    name: name,
    country: country,
    temp: 25,
    condition: 'Sunny',
    imgPath: 'path/to/image.jpg',
  };

  showCard(cityData);
  const existingCards = Array.from(document.querySelectorAll('.card-city'))
    .filter(cardCity => cardCity.textContent.includes(name));
  // Теперь проверяем, что existingCard был правильно найден
  

  expect(existingCards.length).toBeGreaterThan(0);
  expect(existingCards.map(card => card.textContent)).toContain(name + country);
});
test('showCard creates and inserts a new card if it does not exist', () => {
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
  const name = 'City3';
  const country = 'Country3';
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
  showCard(weatherGeoData);
  // Вызовите функцию showCard или имитируйте ее вызов здесь, передавая новые данные

  // Проверьте, что новая карточка была создана и вставлена в DOM
  const newCard = document.querySelector('.card-city');
  expect(newCard).not.toBeNull();
  expect(newCard.textContent).toContain(name);
  expect(newCard.textContent).toContain(country);
  // Проверьте другие данные карточки, если необходимо
});
// test('updateCityTable function', () => {
//     // Подготовьте фиктивные элементы DOM и выполните тесты
//     // Проверьте, что функция updateCityTable внесла изменения в DOM
// });

test('saveCityToLocalStorage saves a city to localStorage', () => {
  // Исходное состояние localStorage
  const initialCities = getCitiesFromLocalStorage();
  const cityName = 'NewCity';

  // Вызов функции saveCityToLocalStorage
  saveCityToLocalStorage(cityName);

  // Получите обновленное состояние localStorage после вызова функции
  const updatedCities = getCitiesFromLocalStorage();

  // Убедитесь, что город был сохранен в localStorage
  expect(updatedCities).toContain(cityName);

  // Очистите localStorage после теста (опционально)
  localStorage.clear();

  // Убедитесь, что исходное состояние восстановлено
  const finalCities = getCitiesFromLocalStorage();
  expect(finalCities).toEqual(initialCities);
});

// test('getCitiesFromLocalStorage function', () => {
//     // Проверьте, что функция правильно извлекает города из localStorage
// });