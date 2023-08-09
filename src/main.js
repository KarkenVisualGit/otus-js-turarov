

// const query = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apikey1}';

//const query2 = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${API key}';

// http://api.weatherapi.com/v1/forecast.json?key=${API key}&days=7

// const query3 = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apikey2}';




const apikey = 'a6a19c057af84c20ac380535230808';
const header = document.querySelector('.header');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');

form.onsubmit = function (e) {
    e.preventDefault();
    let city = input.value.trim();


    const url = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`;

    fetch(url)
    .then((response) => {
        return response.json()
    })
        .then((data) => {

            if (data.error) {
                const prevcard = document.querySelector('.card');
                if (prevcard) prevcard.remove();

                const html = `<div class="card">${data.error.message}</div>`;

                header.insertAdjacentHTML('afterend', html);

            } else {
                const prevcard = document.querySelector('.card');
                if (prevcard) prevcard.remove();

                const html = `<div class="card">
        <h2 class="card-city">${data.location.name}<span>${data.location.country}</span></h2>

        <div class="card-weather">
            <div class="card-value">${data.current.temp_c}<sup>°C</sup></div>
            <img class="card-img" src="./images/4.png" alt="weather">
        </div>

        <div class="card-desc">${data.current.condition.text}</div>

         </div>`;

                header.insertAdjacentHTML('afterend', html);
            }

        })
} 