const APIOPEN = "daaf5312cd361ce0a7f658ad53430535";

export async function getOpenWeather(latitude, longitude) {
  const openUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    `${latitude}&lon=${longitude}&appid=${APIOPEN}`;
  const response = await fetch(openUrl);

  // Если ответ сервера не успешный, выбросим ошибку
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
