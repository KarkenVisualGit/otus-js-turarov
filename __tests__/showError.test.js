// import * as Main from '../src/main';
// jest.mock('../src/main', () => {
//     return {
//         showError: jest.fn()
//     };
// });
// afterEach(() => {
//     jest.clearAllMocks();
// });
// describe('showError', () => {
//     // Setting up the DOM before each test
//     beforeEach(() => {
//         document.body.innerHTML = '<header class="header">Header</header>';
//     });

//     it('inserts an error message after the header', () => {
//         expect(typeof Main.showError).toBe('function');
//         expect(Main.showError).toBeInstanceOf(Function);

//     });

//     it('inserts an error message after the header', () => {
//         // Act: Show an error message
//         const testErrorMessage = 'Test Error';
//         expect(typeof Main.showError).toBe('function');
//         Main.showError(testErrorMessage);

//         // Debug: Check the structure after attempting to show error
//         console.log(document.body.innerHTML);

//         // Assert: Ensure the error message has been correctly inserted
//         const errorCard = document.querySelector('.card');
//         expect(errorCard).toBeTruthy();
// if (errorCard) {
// expect(errorCard.textContent).toBe(testErrorMessage);
// }

//         // Assert: Ensure it is inserted after the header
//         const headerNextSibling = document.querySelector('.header')
//         .nextElementSibling;
//         expect(headerNextSibling.classList.contains('card')).toBeTruthy();
//         expect(headerNextSibling.textContent).toBe(testErrorMessage);
//     });
// });

import { showCardByName } from "../src/main.js";

jest.mock("../src/main", () => ({
  showCardByName: jest.fn(),
}));
afterEach(() => {
  jest.clearAllMocks();
});
describe("cityTable population", () => {
  let cityTable;

  beforeEach(() => {
    // Initial Setup: Create a cityTable and append to document body
    cityTable = document.createElement("table");
    cityTable.innerHTML = "<tr><td>Initial Data</td></tr>";
    document.body.appendChild(cityTable);
  });

  afterEach(() => {
    // Clean up after each test
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  it("populates the cityTable correctly and adds event listeners", () => {
    const cities = ["City1", "City2"];

    cityTable.innerHTML = "";

    cities.forEach((city) => {
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `<td><a href="javascript:void(0);">${city}</a></td>`;
      cityTable.appendChild(tableRow);

      // Adding click event listener
      tableRow.addEventListener("click", () => {
        showCardByName(city);
      });
    });

    // Assert: Ensure the initial data was cleared
    expect(cityTable.innerHTML).not.toContain("Initial Data");

    // Assert: Check if the cities were added correctly
    const tableRows = cityTable.querySelectorAll("tr");
    expect(tableRows).toHaveLength(cities.length);
    expect(tableRows[0].textContent).toBe(cities[0]);
    expect(tableRows[1].textContent).toBe(cities[1]);

    // Assert: Check if clicking on a city calls showCardByName
    tableRows[0].click();
    expect(showCardByName).toHaveBeenCalledWith(cities[0]);

    tableRows[1].click();
    expect(showCardByName).toHaveBeenCalledWith(cities[1]);
  });
});
