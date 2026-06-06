import { generateDOM, html, $ } from "./helpers.js";
import logo from "./assets/logo.svg";

export function Header(root) {
  const markup = html`
    <div class="title">
      <img src=${logo} alt="" class="logo" />
    </div>
    <p class="header-caption">How’s the sky looking today?</p>
    <div class="search-form">
      <form>
        <input
          type="search"
          id="place"
          name="place"
          placeholder="Search for a place"
          required
        />
        <button class="btn-search">Search</button>
      </form>
      <div class="error"></div>
    </div>
  `;

  const bindSearchClick = (handleClick) => {
    $("form").addEventListener("submit", (e) => {
      e.preventDefault();
      handleClick(e.target.place.value);
    });
  };

  const render = () => root.appendChild(generateDOM(markup));

  return { render, bindSearchClick };
}
