import iconLoading from "./assets/icon-loading.svg";
import iconError from "./assets/icon-error.svg";
import { html } from "./helpers.js";

export function Status(root) {
  const allValuesEl = root.querySelectorAll(".value");
  const statusMessageEl = root.querySelector(".status-message");

  const showLoading = () => {
    allValuesEl.forEach((value) => value.classList.add("hidden"));
    statusMessageEl.innerHTML = html`
      <img src="${iconLoading}" alt="" />
      <p>Loading...</p>
    `;
  };

  const showError = (msg) => {
    statusMessageEl.innerHTML = html`
      <img src="${iconError}" alt="" />
      <p>${msg}</p>
    `;
  };

  const hideLoading = () => {
    allValuesEl.forEach((value) => value.classList.remove("hidden"));
    statusMessageEl.textContent = "";
  };

  return { showLoading, showError, hideLoading };
}
