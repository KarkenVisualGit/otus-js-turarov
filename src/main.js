

// const query = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apikey1}';

//const query2 = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${API key}';

// http://api.weatherapi.com/v1/forecast.json?key=${API key}&days=7

// const query3 = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apikey2}';




const apikey = 'a6a19c057af84c20ac380535230808';
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');
let city;

form.onsubmit = function (e) {
    e.preventDefault();
    city = input.value.trim();

    
    const url = 'http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}';

    fetch(url).then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data);
    })
} 