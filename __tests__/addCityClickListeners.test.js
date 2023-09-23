import { addCityClickListeners } from "../src/functions/addCityClickListeners.js";
import { getCitiesFromLocalStorage } from "../src/functions/getCitiesFromLocalStorage.js";
import { attachRowClickListener } from "../src/functions/attachRowClickListener.js";

jest.mock("../src/functions/getCitiesFromLocalStorage.js");
jest.mock("../src/functions/attachRowClickListener.js");

describe("addCityClickListeners", () => {
  beforeEach(() => {
    // Очистите предыдущие моки и DOM перед каждым тестом
    jest.clearAllMocks();
    document.body.innerHTML = "";
  });

  it("should remove all cityTables except the last one and fill the last table with cities", () => {
    // Setup the DOM with three tables.
    document.body.innerHTML = `
      <div class="cityTable">Table 1</div>
      <div class="cityTable">Table 2</div>
      <div class="cityTable">Table 3</div>
    `;

    // Mock getCitiesFromLocalStorage to return a list of cities.
    getCitiesFromLocalStorage.mockReturnValue([
      "Karaganda",
      "Тикси",
      "Ватерлоо",
      "Bucharest",
      "Житомир",
      "Qaraghandy",
      "Moscow",
      "Прага",
    ]);

    addCityClickListeners();

    const cityTables = document.querySelectorAll(".cityTable");
    expect(cityTables).toHaveLength(1); // Only one table should remain.

    const cityRows = cityTables[0].querySelectorAll("tr");
    expect(cityRows).toHaveLength(8); // There should be 8 rows for 8 cities.

    // Check the content of the first and last rows to ensure correctness.
    expect(cityRows[0].textContent).toBe("Karaganda");
    expect(cityRows[7].textContent).toBe("Прага");
  });

  it("should get cities from localStorage and add them to the last table", () => {
    document.body.innerHTML = "<div class=\"cityTable\">Table 1</div>";
    getCitiesFromLocalStorage.mockReturnValue(["City1", "City2"]);

    addCityClickListeners();

    const cityRows = document.querySelectorAll(".cityTable tr");
    expect(cityRows).toHaveLength(2);
    expect(cityRows[0].textContent).toBe("City1");
    expect(cityRows[1].textContent).toBe("City2");
  });

  it("should attach click listeners to each city", () => {
    document.body.innerHTML = "<div class=\"cityTable\">Table 1</div>";
    getCitiesFromLocalStorage.mockReturnValue(["City1", "City2"]);

    addCityClickListeners();

    expect(attachRowClickListener).toHaveBeenCalledTimes(2);
  });
});
