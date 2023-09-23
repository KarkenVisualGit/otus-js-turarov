## [Codecov](https://app.codecov.io/gh/KarkenVisualGit/otus-js-turarov/tree/weather-forecast) Report

> :exclamation: No coverage uploaded for pull request base (`main@a8c33d5`). [Click here to learn what that means](https://docs.codecov.io/docs/error-reference?utm_medium=referral&utm_source=github&utm_content=comment&utm_campaign=pr+comments&utm_term=Karken+Turarov#section-missing-base-commit).
> The diff coverage is `n/a`.

<details><summary>Additional details and impacted files</summary>

```diff
@@           Coverage Diff            @@
##             main        #7   +/-   ##
========================================
  Coverage        ?   100.00%
========================================
  Files           ?        14
  Lines           ?     11869
  Branches        ?        42
========================================
  Hits            ?     11869
  Misses          ?         0
  Partials        ?         0
```

</details>

# Приложение "Прогноз погоды" &middot; [![codecov](https://codecov.io/gh/KarkenVisualGit/otus-js-turarov/graph/badge.svg?token=KFEN18DUH2)](https://app.codecov.io/gh/KarkenVisualGit/otus-js-turarov/tree/weather-forecast)

> Это приложение "Прогноз погоды", выполнено в рамках учебного проекта по изучению JavaScript. В данном приложении можно посмотреть текущий прогноз погоды в своей местности, а также запросить прогноз для любого города. Последние десять запросов сохраняются в истории запросов и позволяют получить доступ к прогнозу погоды для конкретного города повторно. При открытии страницы необходимо дать разрешение на определение текущего местоположения пользователя для отображения погоды в городе.

## Структура проекта

- index.js - входная точка проекта, здесь мы подключаем стили и основной модуль проекта main.js
- main.js - файл, в которой импортированы все основные функции для отображения результатов вывода информации о погоде

  - removecard() - функция, которая удаляет предыдущие карточки погоды для отображения прогноза погоды текущего города
  - showError(errorNessage) - функция, которая выводит сообщение с ошибкой в случае неправильного ввода наименования города
  - getWeather(city) - функция, которая получает информацию с данными и погоде при помощи сервиса api.weatherapi.com
  - getOpenWeather(latitude, longitude) - функция, которая вызывается с аргументами широты и долготы и получает данные о погоде при помощи сервиса api.openweathermap.org
  - getCurrentLocation() - функция, которая получает текущие значения долготы и широты
  - updateCityTable() - функция, которая очищает таблицы с историей запросов по городам и оставляет актуальную
  - getCitiesFromLocalStorage() - функция, которая парсит из локального хранилиша список запрошенных городов
  - saveCityToLocalStorage(city) - функция, которая получает список городов из локального хранилища и обновляет в локальном хранилище последние 10 неповторяющихся городов
  - showCard(\_ref) - функция, которая отображает карточку с прогнозом погоды для выбранного города
  - showCardByName(cityName) - функция, которая отображает карточку с погодой для города, выведенного в таблице с историей
  - attachRowClickListener(tableRow, city) - функция, которая навешивает функцию showCardByName(cityName) по нажатию на название города
  - addCityClickListeners() - функция, которая удаляет лишние таблицы, которые были сгенерированы и оставляет одну последнюю и вызывает внутри себя функцию attachRowClickListener(tableRow, city)
  - getCurrentLocationAndWeather() - функция, которая отображает текущую погоду, определяя позицию долготы и широты текущего пользователя
  - form.onsubmit - функция отображения карточки с погодой при вводе города в форму ввода

  ## Развернуть проект

1. Клонировать репозиторий

```shell

gh repo clone KarkenVisualGit/otus-js-turarov

```

2. Установить зависимости

```shell

npm install

```

3. Запустить локальный сервер

```shell

npm run start

## Api
В проекте использовались следующие открытые API:
1. https://openweathermap.org/current - Получение прогноза погоды с именем города с учетом координат (долготы и широты)
2. https://www.weatherapi.com/ - Получение прогноза погоды
3. https://developers.google.com/maps/documentation/maps-static/start - Google Maps Statis API для получения карты для введенного адреса
```
