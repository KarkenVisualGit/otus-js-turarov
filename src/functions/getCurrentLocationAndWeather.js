import { getCurrentLocation } from "./getCurrentLocation.js";
import { getOpenWeather } from "./getOpenWeather.js";
import { getWeather } from "./getWeather.js";
import { showCard } from "./showCard.js";
import { addCityClickListeners } from "./addCityClickListeners.js";
import conditionsData from "../conditions.js";

export async function getCurrentLocationAndWeather() {
  try {
    // Получаем текущее местоположение
    const { latitude, longitude } = await getCurrentLocation();

    // Получаем данные о погоде для текущего местоположения
    const weatherData = await getOpenWeather(latitude, longitude);

    // Обрабатываем полученные данные о погоде
    console.log("Current Weather Data:", weatherData);
    const geoData = await getWeather(weatherData.name);
    const info = conditionsData.find(
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
