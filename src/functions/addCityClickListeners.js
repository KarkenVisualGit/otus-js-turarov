import { getCitiesFromLocalStorage } from "./getCitiesFromLocalStorage.js";
import { attachRowClickListener } from "./attachRowClickListener.js";

export function addCityClickListeners() {
  const cityTables = document.querySelectorAll(".cityTable");

  if (cityTables.length === 0) return; // Выходим, если нет таблиц на странице

  const lastCityTable = cityTables[cityTables.length - 1]; // Выбираем последнюю таблицу

  // Удаляем все таблицы, кроме последней
  cityTables.forEach((cityTable, index) => {
    if (index !== cityTables.length - 1) {
      cityTable.remove();
    }
  });

  // Получаем список городов из localStorage
  const cities = getCitiesFromLocalStorage();

  // Очищаем содержимое последней таблицы
  lastCityTable.innerHTML = "";

  // Добавляем города в последнюю таблицу
  if (cities && cities.length > 0) {
    cities.forEach((city) => {
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `<td><a class="link" href="javascript:void(0);">${city}</a></td>`;
      lastCityTable.appendChild(tableRow);

      attachRowClickListener(tableRow, city);
    });
  }
}
