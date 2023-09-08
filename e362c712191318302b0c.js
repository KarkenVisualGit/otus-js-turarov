// import "./css/main.css";
// https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}

import conditions from './conditions.js';
const apikey = 'a6a19c057af84c20ac380535230808';
const header = document.querySelector('.header');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');
let arrayCard = [];
function showCard(_ref) {
  let {
    name,
    country,
    temp,
    condition,
    imgPath
  } = _ref;
  arrayCard.push(name);
  if (arrayCard.length > 10) {
    arrayCard.pop();
    removecard();
  }
  const html = `<div class="card">
    <h2 class="card-city">${name}<span>${country}</span></h2>

    <div class="card-weather">
        <div class="card-value">${temp}<sup>°C</sup></div>
        <img class="card-img" src="${imgPath}" alt="weather">
    </div>

    <div class="card-desc">${condition}</div>

     </div>`;
  header.insertAdjacentHTML('afterend', html);
}
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
form.onsubmit = async function (e) {
  e.preventDefault();
  let city = input.value.trim();
  const data = await getWeather(city);
  if (data.error) {
    removecard();
    showError(data.error.message);
  } else {
    // const response = await fetch('./condition.json');

    const info = conditions.find(element => element.code === data.current.condition.code);
    console.log(info);
    console.log(info.languages[23].day_text);
    const fileName = (data.current.is_day ? info.day : info.night) + '.png';
    const filePath = './images/' + (data.current.is_day ? 'day' + `${fileName}` : 'night' + `${fileName}`);
    console.log(fileName);
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