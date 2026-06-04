import { generateDOM, html } from "./helpers.js";

const data = {
  project:
    "https://www.theodinproject.com/lessons/node-path-javascript-weather-app",
  design: "https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49",
  sourceCode: "https://github.com/sydalwedaie/odin-project-weather-app",
  profile: "https://github.com/sydalwedaie",
};

export function Attribution(root) {
  const markup = html`
    <div class="attribution">
      <p>
        <span>Project by</span>
        <a href=${data.project}>The Odin Project</a>.
        <span>Design by</span>
        <a href=${data.design}>Frontend Mentor</a>.
      </p>
      <p>
        <span>Source code on</span>
        <a href=${data.sourceCode}>GitHub</a>.
        <span>Coded with ❤️ by</span>
        <a href=${data.profile}>Sayed Ali</a>
      </p>
    </div>
  `;

  const render = () => root.appendChild(generateDOM(markup));

  return { render };
}
