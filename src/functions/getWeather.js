const apikey = "a6a19c057af84c20ac380535230808";

export async function getWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
