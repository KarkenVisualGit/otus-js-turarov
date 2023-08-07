const apikey = 'a5a4acc119a94559a13161242230708';

const apikey1 = 'daaf5312cd361ce0a7f658ad53430535'; 

const apikey2 = '7254217e1d958c1e53f409df79b3257e';

const query1 = 'http://api.weatherapi.com/v1/current.json?key=${apikey}&q=London';

const query = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apikey2}';

//const query2 = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${API key}';

// http://api.weatherapi.com/v1/forecast.json?key=<a5a4acc119a94559a13161242230708>&q=07112&days=7

//

fetch(query1).then((response) =>{
    return response.json()
}).then ((data) =>{
    console.log(data);
})

//http://api.weatherapi.com/v1/current.json?key=a5a4acc119a94559a13161242230708&q=London