import { getCitiesFromLocalStorage } from "../src/functions/getCitiesFromLocalStorage.js";

describe("getCitiesFromLocalStorage", () => {
  // очищаем моки после каждого теста
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return cities from localStorage", () => {
    const mockCities = ["City1", "City2", "City3"];
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockCities));

    const result = getCitiesFromLocalStorage();

    expect(result).toEqual(mockCities);
    expect(localStorage.getItem).toHaveBeenCalledWith("cities");
  });

  it("should return an empty array if cities is not in localStorage", () => {
    Storage.prototype.getItem = jest.fn(() => null);

    const result = getCitiesFromLocalStorage();

    expect(result).toEqual([]);
    expect(localStorage.getItem).toHaveBeenCalledWith("cities");
  });
});
