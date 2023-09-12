// 'use strict';
// import {
//     showCard,
//     updateCityTable,
//     saveCityToLocalStorage,
//     getCitiesFromLocalStorage,
//     removecard,
//     showError,
//     getWeather,
//     getOpenWeather,
//     getCurrentLocationAndWeather,
//     getCurrentLocation,
//     showCardByName
// } from '../src/main';
import { JSDOM } from 'jsdom';
// const { JSDOM } = require("jsdom");
// const { JSDOM } = jsdom;
// import { TextEncoder } from 'text-encoding';
// global.TextEncoder = TextEncoder;
let window;
let document;
let header;
let form;
let input;
beforeEach(() => {
    const dom = new JSDOM(`
      <header class="header">
        <h1 class="title">Weather forecast</h1>
        <form class="form" id="form">
          <input id="inputCity" type="text" class="input" placeholder="Enter city name">
          <button class="btn">Show</button>
        </form>
      </header>
    `);

    window = dom.window;
    document = window.document;
    header = document.querySelector('.header');
    form = document.querySelector('#form');
    input = document.querySelector('#inputCity');
});

test('showCard function', () => {
    const titleElement = document.querySelector('.title');
    expect(titleElement).not.toBeNull();
    expect(titleElement.textContent).toBe('Weather forecast');
    
    // Пример: const element = document.createElement('div');
    // Вызовите функцию showCard с нужными аргументами
    // Проверьте, что она внесла изменения в DOM в соответствии с ожиданиями
});

// test('updateCityTable function', () => {
//     // Подготовьте фиктивные элементы DOM и выполните тесты
//     // Проверьте, что функция updateCityTable внесла изменения в DOM
// });

// test('saveCityToLocalStorage function', () => {
//     // Проверьте, что функция правильно сохраняет города в localStorage
// });

// test('getCitiesFromLocalStorage function', () => {
//     // Проверьте, что функция правильно извлекает города из localStorage
// });