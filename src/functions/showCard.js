import { saveCityToLocalStorage } from "./saveCityToLocalStorage.js";
import { updateCityTable } from "./updateCityTable.js";

const APIKEY = "AIzaSyBXtNPlUvaj6wQD1bxS0vBd-RvUMMbvdZQ";

export function showCard(_ref) {
  const header = document.querySelector(".header");
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
