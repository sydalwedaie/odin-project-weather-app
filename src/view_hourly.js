import { generateDOM, getWxIcon, html, $ } from "./helpers.js";
import { format } from "date-fns";

export function HourlyForecast(root) {
  const cardsMarkup = [...Array(24).keys()]
    .map((hour) => {
      return html`
        <div class="card hour-${hour}" data-hour=${hour}>
          <img src="#" alt="" class="wx-icon" />
          <p class="hour">_</p>
          <p class="temp">_</p>
        </div>
      `;
    })
    .join("");

  const markup = html`
    <section class="hourly-forecast">
      <h1>Hourly forecast</h1>
      <div class="wrapper-hourly-cards">${cardsMarkup}</div>
    </section>
  `;

  const render = () => root.appendChild(generateDOM(markup));
  const load = (wxData) => {
    const hourlyCards = document.querySelectorAll(
      ".wrapper-hourly-cards .card"
    );
    hourlyCards.forEach((card) => {
      const iconEl = card.querySelector(".wx-icon");
      const hourEl = card.querySelector(".hour");
      const tempEl = card.querySelector(".temp");

      const data = wxData.days[1].hours[card.dataset.hour];

      iconEl.src = getWxIcon(data.icon);
      iconEl.alt = data.icon;
      hourEl.textContent = format(data.datetimeEpoch * 1000, "HH aa"); // gotcha
      tempEl.textContent = Math.floor(data.temp) + "°";
    });
  };

  return { render, load };
}
