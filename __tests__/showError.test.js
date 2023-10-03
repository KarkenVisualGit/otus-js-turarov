import { showError } from "../src/functions/showError.js";

describe("showError", () => {
  // Имитация DOM-элемента
  const mockHeader = {
    insertAdjacentHTML: jest.fn(),
  };

  beforeAll(() => {
    // Мокаем document.querySelector чтобы вернуть наш имитированный header
    document.querySelector = jest.fn().mockReturnValue(mockHeader);
  });

  afterEach(() => {
    // Очистка всех моков после каждого теста
    jest.clearAllMocks();
  });

  it("should insert an error message after the header", () => {
    const errorMessage = "Test error message";

    showError(errorMessage);

    // Проверяем, что mockHeader.insertAdjacentHTML вызывается с правильными аргументами
    expect(mockHeader.insertAdjacentHTML).toHaveBeenCalledWith(
      "afterend",
      `<div class="card">${errorMessage}</div>`,
    );
  });

  it("should not throw errors if header is not found", () => {
    document.querySelector = jest.fn().mockReturnValue(null);

    const errorMessage = "Another test error message";

    expect(() => showError(errorMessage)).not.toThrow();
  });
});
