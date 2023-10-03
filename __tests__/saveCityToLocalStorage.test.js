import { saveCityToLocalStorage } from "../src/functions/saveCityToLocalStorage.js";
import { getCitiesFromLocalStorage } from "../src/functions/getCitiesFromLocalStorage.js";

jest.mock("../src/functions/getCitiesFromLocalStorage.js");

describe("saveCityToLocalStorage", () => {
  let setItemMock;

  beforeEach(() => {
    // Очистка всех моков перед каждым тестом
    jest.clearAllMocks();

    // Замокать функции localStorage
    setItemMock = jest.fn();
    Object.defineProperty(window, "localStorage", {
      value: {
        setItem: setItemMock,
      },
      writable: true,
    });
  });

  it("should save new city when the list is not full", () => {
    getCitiesFromLocalStorage.mockReturnValue(["City1", "City2"]);

    saveCityToLocalStorage("City3");

    expect(setItemMock).toHaveBeenCalledWith(
      "cities",
      JSON.stringify(["City1", "City2", "City3"]),
    );
  });

  it("should not save the city if it already exists in the list", () => {
    getCitiesFromLocalStorage.mockReturnValue(["City1", "City2", "City3"]);

    saveCityToLocalStorage("City3");

    expect(setItemMock).not.toHaveBeenCalled();
  });

  it("should remove the first city when the list has 10 cities", () => {
    getCitiesFromLocalStorage.mockReturnValue([
      "City1",
      "City2",
      "City3",
      "City4",
      "City5",
      "City6",
      "City7",
      "City8",
      "City9",
      "City10",
    ]);

    saveCityToLocalStorage("City11");

    expect(setItemMock).toHaveBeenCalledWith(
      "cities",
      JSON.stringify([
        "City2",
        "City3",
        "City4",
        "City5",
        "City6",
        "City7",
        "City8",
        "City9",
        "City10",
        "City11",
      ]),
    );
  });
});
