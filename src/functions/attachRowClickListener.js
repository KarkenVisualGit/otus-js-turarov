import { showCardByName } from "./showCardByName.js";

export function attachRowClickListener(tableRow, city) {
  tableRow.addEventListener("click", () => {
    showCardByName(city);
  });
}
