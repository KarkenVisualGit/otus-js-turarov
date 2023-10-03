import { getCitiesFromLocalStorage } from "./getCitiesFromLocalStorage.js";

export function saveCityToLocalStorage(city) {
  // Получаем текущий список городов из localStorage
  const cities = getCitiesFromLocalStorage();
  if (cities.length >= 10) {
    cities.shift();
  }
  // Проверяем, что город еще не сохранен
  if (!cities.includes(city)) {
    // Добавляем город в список
    cities.push(city);

    // Сохраняем обновленный список в localStorage
    localStorage.setItem("cities", JSON.stringify(cities));
  }
}
