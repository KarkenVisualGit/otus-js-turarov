import { attachRowClickListener } from "../src/functions/attachRowClickListener.js";
import { showCardByName } from "../src/functions/showCardByName.js";

jest.mock("../src/functions/showCardByName.js", () => ({
  showCardByName: jest.fn(),
}));

describe("attachRowClickListener", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add click listener and call showCardByName with correct city on click", () => {
    const mockTableRow = document.createElement("tr");
    const testCity = "Test City";

    attachRowClickListener(mockTableRow, testCity);

    // Simulate a click event on the mockTableRow.
    mockTableRow.click();

    // Expect the showCardByName to have been called with the testCity.
    expect(showCardByName).toHaveBeenCalledWith(testCity);
  });
});
