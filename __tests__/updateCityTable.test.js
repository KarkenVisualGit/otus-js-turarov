import { updateCityTable } from "../src/functions/updateCityTable.js";

describe("updateCityTable", () => {
  beforeEach(() => {
    // Очищаем содержимое body перед каждым тестом
    document.body.innerHTML = "";
  });

  it("should not remove any tables if there is only one", () => {
    document.body.innerHTML = `
            <div class="cityTable">Table 1</div>
        `;

    updateCityTable();

    const cityTables = document.querySelectorAll(".cityTable");
    expect(cityTables).toHaveLength(1);
  });

  it("should remove the first table if there are multiple tables", () => {
    document.body.innerHTML = `
            <div class="cityTable">Table 1</div>
            <div class="cityTable">Table 2</div>
            <div class="cityTable">Table 3</div>
        `;

    updateCityTable();

    const cityTables = document.querySelectorAll(".cityTable");
    expect(cityTables).toHaveLength(2);
    expect(cityTables[0].textContent).toBe("Table 2");
    expect(cityTables[1].textContent).toBe("Table 3");
  });
});
