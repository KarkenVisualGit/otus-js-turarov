export function showError(errorNessage) {
  const header = document.querySelector(".header");
  const html = `<div class="card">${errorNessage}</div>`;
  if (header) header.insertAdjacentHTML("afterend", html);
}
