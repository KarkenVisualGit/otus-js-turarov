import { addCityClickListeners } from "../src/main.js";

describe("addCityClickListeners", () => {
  let mockGetCitiesFromLocalStorage;
  let mockAttachRowClickListener;

  beforeEach(() => {
    // 1. Мокирование localStorage
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => JSON.stringify(["City1", "City2", "City3"])),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });

    // 2. Добавление элементов DOM
    document.body.innerHTML = `
      <div class="cityTable">Table 1</div>
      <div class="cityTable">Table 2</div>
    `;

    // 3. Мокирование других функций
    mockGetCitiesFromLocalStorage = jest.fn(() => ["City1", "City2", "City3"]);
    mockAttachRowClickListener = jest.fn();
    jest.mock("../src/main", () => ({
      ...jest.requireActual("../src/main"),
      getCitiesFromLocalStorage: mockGetCitiesFromLocalStorage,
      attachRowClickListener: mockAttachRowClickListener,
    }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("removes all cityTables except the last one", () => {
    addCityClickListeners();

    const cityTables = document.querySelectorAll(".cityTable");
    expect(cityTables).toHaveLength(1);
  });

  test("clears the content of the last cityTable", () => {
    addCityClickListeners();

    const cityTables = document.querySelector(".cityTable");
    expect(cityTables.innerHTML).toBe(
      "<tr><td><a href=\"javascript:void(0);\">City1</a></td></tr>" +
        "<tr><td><a href=\"javascript:void(0);\">City2</a></td></tr>" +
        "<tr><td><a href=\"javascript:void(0);\">City3</a></td></tr>",
    );
  });

  // test('calls attachRowClickListener for each city', () => {
  //     addCityClickListeners();
  //     expect(mockAttachRowClickListener).toHaveBeenCalledTimes(3);
  // });
});
