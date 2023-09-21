import conditions from "./conditions.js";

const apikey = "a6a19c057af84c20ac380535230808";
const APIKEY = "AIzaSyBXtNPlUvaj6wQD1bxS0vBd-RvUMMbvdZQ";
const APIOPEN = "daaf5312cd361ce0a7f658ad53430535";
const header = document.querySelector(".header");
const form = document.querySelector(".form");
const input = document.querySelector(".input");

export function removecard() {
  const prevcard = document.getElementsByClassName("card");
  if (prevcard.length > 0) prevcard[prevcard.length - 1].remove();
}

export function showError(errorNessage) {
  const html = `<div class="card">${errorNessage}</div>`;
  if (header) header.insertAdjacentHTML("afterend", html);
}

export async function getWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getOpenWeather(latitude, longitude) {
  const openUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    `${latitude}&lon=${longitude}&appid=${APIOPEN}`;
  const response = await fetch(openUrl);
  const data = await response.json();
  return data;
}

export async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude } = position.coords;
          const { longitude } = position.coords;
          resolve({
            latitude,
            longitude,
          });
        },
        (error) => {
          reject(error);
        },
      );
    }
  });
}

export function updateCityTable() {
  const cityTables = document.querySelectorAll(".cityTable");
  if (cityTables.length > 1) {
    cityTables[0].remove();
  }
}

export function getCitiesFromLocalStorage() {
  // Получаем текущий список городов из localStorage
  const citiesJSON = localStorage.getItem("cities");

  // Если список не существует, создаем пустой массив
  return citiesJSON ? JSON.parse(citiesJSON) : [];
}

export function saveCityToLocalStorage(city) {
  // Получаем текущий список городов из localStorage
  const cities = getCitiesFromLocalStorage();
  if (cities.length >= 10) {
    cities.shift();
  }
  // Проверяем, что город еще не сохранен
  if (!cities.includes(city)) {
    // Добавляем город в список
    cities.push(city);

    // Сохраняем обновленный список в localStorage
    localStorage.setItem("cities", JSON.stringify(cities));
  }
}

export function showCard(_ref) {
  const { name, country, temp, condition, imgPath } = _ref;
  const existingCard = Array.from(document.querySelectorAll(".card-city")).find(
    (cardCity) => cardCity.textContent.includes(name),
  );
  if (!existingCard) {
    // Сохраняем город в localStorage
    saveCityToLocalStorage(name);
    const mapPath = `https://maps.googleapis.com/maps/api/staticmap?center=
    ${name}&zoom=12&size=400x400&key=${APIKEY}`;
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
    if (header) header.insertAdjacentHTML("afterend", html);
    updateCityTable(); // Обновляем таблицу с городами
  }
}

export async function showCardByName(cityName) {
  // Удаляем существующую карточку с таким же городом, если она существует
  const existingCard = Array.from(document.querySelectorAll(".card-city")).find(
    (cardCity) => cardCity.textContent.includes(cityName),
  );
  if (!existingCard) {
    const data = await getWeather(cityName);
    const info = conditions.find(
      (element) => element.code === data.current.condition.code,
    );
    if (!info || !info.languages || !info.languages[23]) {
      throw new Error("Unable to find condition info.");
    }
    const weatherGeoData = {
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: data.current.is_day
        ? info.languages[23].day_text
        : info.languages[23].night_text,
      imgPath: data.current.condition.icon,
    };
    showCard(weatherGeoData);
    removecard();
  }
}

export function attachRowClickListener(tableRow, city) {
  tableRow.addEventListener("click", () => {
    showCardByName(city);
  });
}

export function addCityClickListeners() {
  const cityTables = document.querySelectorAll(".cityTable");

  if (cityTables.length === 0) return; // Выходим, если нет таблиц на странице

  const lastCityTable = cityTables[cityTables.length - 1]; // Выбираем последнюю таблицу

  // Удаляем все таблицы, кроме последней
  cityTables.forEach((cityTable, index) => {
    if (index !== cityTables.length - 1) {
      cityTable.remove();
    }
  });

  // Получаем список городов из localStorage
  const cities = getCitiesFromLocalStorage();

  // Очищаем содержимое последней таблицы
  lastCityTable.innerHTML = "";

  // Добавляем города в последнюю таблицу
  cities.forEach((city) => {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `<td><a href="javascript:void(0);">${city}</a></td>`;
    lastCityTable.appendChild(tableRow);

    attachRowClickListener(tableRow, city);
  });
}

export async function getCurrentLocationAndWeather() {
  try {
    // Получаем текущее местоположение
    const { latitude, longitude } = await getCurrentLocation();

    // Получаем данные о погоде для текущего местоположения
    const weatherData = await getOpenWeather(latitude, longitude);

    // Обрабатываем полученные данные о погоде
    console.log("Current Weather Data:", weatherData);
    const geoData = await getWeather(weatherData.name);
    const info = conditions.find(
      (element) => element.code === geoData.current.condition.code,
    );
    const weatherGeoData = {
      name: geoData.location.name,
      country: geoData.location.country,
      temp: geoData.current.temp_c,
      condition: geoData.current.is_day
        ? info.languages[23].day_text
        : info.languages[23].night_text,
      imgPath: geoData.current.condition.icon,
    };
    showCard(weatherGeoData);
    addCityClickListeners();
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Функция для получения текущего местоположения
getCurrentLocationAndWeather();
// Первоначально обновляем таблицу городов при загрузке страницы
updateCityTable();

if (form)
  form.onsubmit = async (e) => {
    e.preventDefault();
    const city = input.value.trim();
    const data = await getWeather(city);
    if (data.error) {
      removecard();
      showError(data.error.message);
    } else {
      removecard();
      const info = conditions.find(
        (element) => element.code === data.current.condition.code,
      );
      console.log(data);
      console.log(info);
      const filePath = data.current.condition.icon;
      console.log(filePath);
      const weatherData = {
        name: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.is_day
          ? info.languages[23].day_text
          : info.languages[23].night_text,
        imgPath: filePath,
      };
      showCard(weatherData);
      addCityClickListeners();
      updateCityTable();
      input.value = "";
    }
  };
