import { removecard } from "../src/functions/removeCard.js";

describe("removecard", () => {
  const createCard = () => {
    const card = document.createElement("div");
    const APIKEY = "AIzaSyBXtNPlUvaj6wQD1bxS0vBd-RvUMMbvdZQ";
    const name = "Амир Тимур";
    const mapPath = `https://maps.googleapis.com/maps/api/staticmap?center=
      ${name}&zoom=12&size=400x400&key=${APIKEY}`;
    card.className = "card";
    card.innerHTML = `
            <h2 class="card-city">Амир Тимур<span>Узбекистан</span></h2>
            <div class="card-weather">
                <div class="card-value">24<sup>°C</sup></div>
                <img class="card-img" src="//cdn.weatherapi.com/weather/64x64/day/113.png" 
                alt="weather">
            </div>
            <div class="card-desc">Солнечно</div>
            <div class="map">
                <img class="img-map" 
                src="${mapPath}" alt="weathermap">
            </div>
        `;
    document.body.appendChild(card);
  };

  beforeEach(() => {
    // Очистка DOM перед каждым тестом
    document.body.innerHTML = "";
  });

  it("should remove the last card when there are multiple cards", () => {
    createCard(); // создаем первую карточку
    createCard(); // создаем вторую карточку

    removecard();

    const cards = document.getElementsByClassName("card");
    expect(cards).toHaveLength(1); // Ожидаем, что останется только одна карточка
  });

  it("should not remove the card when only one is present", () => {
    createCard(); // создаем одну карточку

    removecard();

    const cards = document.getElementsByClassName("card");
    expect(cards).toHaveLength(0);
  });
});
