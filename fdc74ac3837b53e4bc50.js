// import "./css/main.css";
// https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}
//`https://maps.googleapis.com/maps/api/staticmap?center=${city}&zoom=12&size=400x400&key=${APIKEY}`

import conditions from './conditions.js';
const apikey = 'a6a19c057af84c20ac380535230808';
const APIKEY = 'AIzaSyBXtNPlUvaj6wQD1bxS0vBd-RvUMMbvdZQ';
const APIOPEN = 'daaf5312cd361ce0a7f658ad53430535';
const header = document.querySelector('.header');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');

// let arrayCard = [];
// function showCard({ name, country, temp, condition, imgPath }) {
//     const existingCard = Array.from(document.querySelectorAll('.card-city'))
//         .find(cardCity => cardCity.textContent.includes(name));

//     if (!existingCard) {
//         const mapPath = `https://maps.googleapis.com/maps/api/staticmap?center=${name}&zoom=12&size=400x400&key=${APIKEY}`;
//         const html = `<div class="card">
//         <h2 class="card-city">${name}<span>${country}</span></h2>

//         <div class="card-weather">
//             <div class="card-value">${temp}<sup>°C</sup></div>
//             <img class="card-img" src="${imgPath}" alt="weather">
//         </div>

//         <div class="card-desc">${condition}</div>
//         <div class="map">
//             <img class="img-map" src="${mapPath}" alt="weathermap">
//         </div>
//     </div>
//     <div class="cityTable"></div>`;

//         header.insertAdjacentHTML('afterend', html);
//         const cityTables = document.querySelectorAll('.cityTable');
//         const tableRow = document.createElement('tr');
//         tableRow.innerHTML = `<td><a href="javascript:void(0);">${name}</a></td>`;
//         cityTables.forEach(cityTable => {
//             cityTable.appendChild(tableRow.cloneNode(true)); // Используйте cloneNode, чтобы создать копию tableRow
//         });

//         // Добавляем обработчик события для клика на городе
//         tableRow.addEventListener('click', () => {
//             // Вызываем функцию для отображения погоды для выбранного города
//             showCardByName(name);
//         });
//     }

// }
function showCard(_ref) {
  let {
    name,
    country,
    temp,
    condition,
    imgPath
  } = _ref;
  const existingCard = Array.from(document.querySelectorAll('.card-city')).find(cardCity => cardCity.textContent.includes(name));
  if (!existingCard) {
    // Сохраняем город в localStorage
    saveCityToLocalStorage(name);
    const mapPath = `https://maps.googleapis.com/maps/api/staticmap?center=${name}&zoom=12&size=400x400&key=${APIKEY}`;
    const html = `<div class="card">
          <h2 class="card-city">${name}<span>${country}</span></h2>
  
          <div class="card-weather">
              <div class="card-value">${temp}<sup>°C</sup></div>
              <img class="card-img" src="${imgPath}" alt="weather">
          </div>
  
          <div class="card-desc">${condition}</div>
          <div class="map">
              <img class="img-map" src="${mapPath}" alt="weathermap">
          </div>
      </div>
      <div class="cityTable"></div>`;
    header.insertAdjacentHTML('afterend', html);
    updateCityTable(); // Обновляем таблицу с городами
  }
}

function updateCityTable() {
  const cityTables = document.querySelectorAll('.cityTable');
  if (cityTables.length > 1) {
    // Проходимся по всем элементам, начиная с второго (индекс 1)
    for (let i = 1; i < cityTables.length; i++) {
      // Удаляем элемент
      cityTables[i].remove();
    }
  }
  cityTables.forEach(cityTable => {
    // Получаем список городов из localStorage
    const cities = getCitiesFromLocalStorage();

    // Очищаем содержимое таблицы
    cityTable.innerHTML = '';

    // Добавляем города в таблицу
    cities.forEach(city => {
      const tableRow = document.createElement('tr');
      tableRow.innerHTML = `<td><a href="javascript:void(0);">${city}</a></td>`;
      cityTable.appendChild(tableRow);

      // Добавляем обработчик события для клика на городе
      tableRow.addEventListener('click', () => {
        // Вызываем функцию для отображения погоды для выбранного города
        showCardByName(city);
      });
    });
  });
}
function saveCityToLocalStorage(city) {
  // Получаем текущий список городов из localStorage
  let cities = getCitiesFromLocalStorage();
  if (cities.length >= 10) {
    cities = cities.slice(0, 9); // Оставляем только первые 10 элементов
  }
  // Проверяем, что город еще не сохранен
  if (!cities.includes(city)) {
    // Добавляем город в список
    cities.push(city);

    // Сохраняем обновленный список в localStorage
    localStorage.setItem('cities', JSON.stringify(cities));
  }
}
function getCitiesFromLocalStorage() {
  // Получаем текущий список городов из localStorage
  let citiesJSON = localStorage.getItem('cities');

  // Если список не существует, создаем пустой массив
  return citiesJSON ? JSON.parse(citiesJSON) : [];
}

// Первоначально обновляем таблицу городов при загрузке страницы
updateCityTable();
function removecard() {
  const prevcard = document.getElementsByClassName('card');
  if (prevcard) prevcard[prevcard.length - 1].remove();
}
function showError(errorNessage) {
  const html = `<div class="card">${errorNessage}</div>`;
  header.insertAdjacentHTML('afterend', html);
}
async function getWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
async function getOpenWeather(latitude, longitude) {
  const openUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIOPEN}`;
  const response = await fetch(openUrl);
  const data = await response.json();
  return data;
}
async function getCurrentLocationAndWeather() {
  try {
    // Получаем текущее местоположение
    const {
      latitude,
      longitude
    } = await getCurrentLocation();

    // Получаем данные о погоде для текущего местоположения
    const weatherData = await getOpenWeather(latitude, longitude);

    // Обрабатываем полученные данные о погоде
    console.log('Current Weather Data:', weatherData);
    const geoData = await getWeather(weatherData.name);
    const weatherGeoData = {
      name: geoData.location.name,
      country: geoData.location.country,
      temp: geoData.current.temp_c,
      condition: geoData.current.condition.text,
      imgPath: geoData.current.condition.icon
    };
    showCard(weatherGeoData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}
// Функция для получения текущего местоположения
async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      resolve({
        latitude,
        longitude
      });
    }, error => {
      reject(error);
    });
  });
}
// const openData = await getOpenWeather();
// const geoData = await getWeather(openData.name);
getCurrentLocationAndWeather();
async function showCardByName(cityName) {
  // Удаляем существующую карточку с таким же городом, если она существует
  const existingCard = Array.from(document.querySelectorAll('.card-city')).find(cardCity => cardCity.textContent.includes(cityName));
  if (!existingCard) {
    // const cardCities = document.querySelectorAll('.card-city');
    // cardCities.forEach(cardCity => {
    //     const parentElement = cardCity.element;
    //     if (parentElement) {
    //         parentElement.remove();
    //     }
    // }); 
    const data = await getWeather(cityName);
    const weatherGeoData = {
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: data.current.condition.text,
      imgPath: data.current.condition.icon
    };
    showCard(weatherGeoData);
    const cityCard = document.querySelectorAll('.card');
    if (cityCard.length > 1) {
      // Проходимся по всем элементам, начиная с второго (индекс 1)
      for (let i = 1; i < cityCard.length; i++) {
        // Удаляем элемент
        cityCard[i].remove();
      }
    }
  }

  // Получаем погоду для выбранного города
}

form.onsubmit = async function (e) {
  e.preventDefault();
  let city = input.value.trim();
  const data = await getWeather(city);
  if (data.error) {
    removecard();
    showError(data.error.message);
  } else {
    removecard();
    // const response = await fetch('https://www.weatherapi.com/docs/conditions.json');
    // const response = await fetch('./conditions.js');
    const info = conditions.find(element => element.code === data.current.condition.code);
    console.log(data);
    console.log(info);
    // console.log(info.languages[23].day_text);

    // const fileName = (data.current.is_day ? info.day : info.night) + '.png';
    // const fileName = data.current.condition.text + '.png';
    // const filePath = './images/' + (data.current.is_day ? 'day' + `${fileName}` : 'night' + `${fileName}`);
    const filePath = data.current.condition.icon;

    // console.log(fileName);
    console.log(filePath);
    const weatherData = {
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: data.current.is_day ? info.languages[23].day_text : info.languages[23].night_text,
      imgPath: filePath
    };
    showCard(weatherData);
  }
};