export function updateCityTable() {
  const cityTables = document.querySelectorAll(".cityTable");
  if (cityTables.length > 1) {
    cityTables[0].remove();
  }
}
