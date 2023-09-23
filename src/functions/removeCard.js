export function removecard() {
  const prevcard = document.getElementsByClassName("card");
  if (prevcard.length > 0) prevcard[prevcard.length - 1].remove();
}
