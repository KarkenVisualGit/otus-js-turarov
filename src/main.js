
import conditions from './conditions.js';



const apikey = 'a6a19c057af84c20ac380535230808';
const header = document.querySelector('.header');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');
let arrayCard = [];

function showCard({ name, country, temp, condition }) {
    const html = `<div class="card">
    <h2 class="card-city">${name}<span>${country}</span></h2>

    <div class="card-weather">
        <div class="card-value">${temp}<sup>°C</sup></div>
        <img class="card-img" src="./images/4.png" alt="weather">
    </div>

    <div class="card-desc">${condition}</div>

     </div>`;

    header.insertAdjacentHTML('afterend', html);

    // arrayCard.push(name);
    // if (arrayCard.length > 3) {
    //     arrayCard.shift();
    //     removecard();

    // }

}
function removecard() {
    const prevcard = document.querySelector('.card');
    if (prevcard) prevcard.remove();
}

function showError(errorNessage) {
    const html = `<div class="card">${errorNessage}</div>`;

    header.insertAdjacentHTML('afterend', html);
}

async function getWeather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`;
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
        removecard();

        const response = await fetch('./condition.json');

        const info = conditions.find((element) => element.code === data.current.condition.code);
        console.log(info);
        console.log(info.languages[23].day_text);

        const condition = data.current.is_day ? info.languages[23].day_text : info.languages[23].night_text;
        const fileName = data.current.is_day ? info.day : info.night;

        const weatherData = {
            name: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            condition: condition
        };

        showCard(weatherData);
    }

    // fetch(url)
    //     .then((response) => {
    //         return response.json()
    //     })
    //     .then((data) => {
    //         console.log(data);
    //     })
}
