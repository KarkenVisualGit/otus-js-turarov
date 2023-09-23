export function getCitiesFromLocalStorage() {
  // Получаем текущий список городов из localStorage
  const citiesJSON = localStorage.getItem("cities");

  // Если список не существует, создаем пустой массив
  return citiesJSON ? JSON.parse(citiesJSON) : [];
}
