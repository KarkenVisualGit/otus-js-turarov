import { showCard } from "../src/functions/showCard.js";
import { saveCityToLocalStorage } from "../src/functions/saveCityToLocalStorage.js";
import { updateCityTable } from "../src/functions/updateCityTable.js";

jest.mock("../src/functions/saveCityToLocalStorage.js");
jest.mock("../src/functions/updateCityTable.js");

describe("showCard", () => {
  let header;

  beforeEach(() => {
    // Очистка всех моков перед каждым тестом
    jest.clearAllMocks();

    document.body.innerHTML = ""; // очищаем содержимое body

    // Создание фейкового элемента header для тестов
    header = document.createElement("div");
    header.classList.add("header");
    document.body.appendChild(header);
  });

  afterEach(() => {
    // Удаление фейкового элемента header после каждого теста
    header.remove();
  });

  it("should save city to localstorage, add card and update city table", () => {
    const testData = {
      name: "Test City",
      country: "Test Country",
      temp: 25,
      condition: "Sunny",
      imgPath: "test_path.png",
    };

    const existingCards = Array.from(document.querySelectorAll(".card-city"));
    existingCards.forEach((card) => {
      if (card.textContent.includes(testData.name)) {
        card.parentElement.remove(); // Удаляем родительский элемент .card
      }
    });

    showCard(testData);

    // Проверка вызова saveCityToLocalStorage
    expect(saveCityToLocalStorage).toHaveBeenCalledWith(testData.name);

    // Проверка создания карточки города
    const card = document.querySelector(".card");
    console.log(card);
    expect(card).toBeTruthy();

    // Проверка обновления таблицы с городами
    expect(updateCityTable).toHaveBeenCalled();
  });

  it("should not save city or add card if city already exists", () => {
    const testData = {
      name: "Existing City",
      country: "Test Country",
      temp: 25,
      condition: "Sunny",
      imgPath: "test_path.png",
    };

    const card = document.createElement("div");
    card.classList.add("card");

    const existingCity = document.createElement("h2");
    existingCity.classList.add("card-city");
    existingCity.textContent = "Existing City";
    card.appendChild(existingCity);

    document.body.appendChild(card);

    showCard(testData);

    // Проверка, что функции не вызываются
    expect(saveCityToLocalStorage).not.toHaveBeenCalled();
    expect(updateCityTable).not.toHaveBeenCalled();

    const cards = document.querySelectorAll(".card");
    expect(cards).toHaveLength(1); // Проверяем, что карточка не была добавлена
  });
});
