import conditionsData from "../conditions.js";
import { getWeather } from "./getWeather.js";
import { showCard } from "./showCard.js";
import { removecard } from "./removeCard.js";

export async function showCardByName(cityName) {
  // Удаляем существующую карточку с таким же городом, если она существует
  const existingCard = Array.from(document.querySelectorAll(".card-city")).find(
    (cardCity) => cardCity.textContent.includes(cityName),
  );
  if (!existingCard) {
    const data = await getWeather(cityName);
    const info = conditionsData.find(
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
