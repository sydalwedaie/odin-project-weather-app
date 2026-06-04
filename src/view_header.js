import { generateDOM, getWxIcon, html } from "./helpers.js";
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
        />
        <button>Search</button>
      </form>
    </div>
  `;

  const render = () => root.appendChild(generateDOM(markup));

  return { render };
}
