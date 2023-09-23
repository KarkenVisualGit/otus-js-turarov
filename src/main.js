import conditionsData from "./conditions.js";
import { removecard } from "./functions/removeCard.js";
import { showError } from "./functions/showError.js";
import { getWeather } from "./functions/getWeather.js";
import { showCard } from "./functions/showCard.js";
import { addCityClickListeners } from "./functions/addCityClickListeners.js";
import { getCurrentLocationAndWeather } from "./functions/getCurrentLocationAndWeather.js";
import { updateCityTable } from "./functions/updateCityTable.js";

const form = document.querySelector(".form");
const input = document.querySelector(".input");

// Функция для получения текущего местоположения
await getCurrentLocationAndWeather();
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
      input.value = "";
    } else {
      removecard();
      const info = conditionsData.find(
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
