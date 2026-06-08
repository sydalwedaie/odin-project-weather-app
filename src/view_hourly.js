import { generateDOM, getWxIcon, html, $ } from "./helpers.js";
import { format } from "date-fns";

export function HourlyForecast(root) {
  const cardsMarkup = [...Array(24).keys()]
    .map((hour) => {
      return html`
        <div class="card hour-${hour}" data-hour=${hour}>
          <p class="value time">
            <span class="hour">_</span>
            <span class="ap">_</span>
          </p>
          <img src="#" alt="" class="value wx-icon" />
          <p class="value temp">_</p>
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
  const update = (wxData) => {
    const hourlyCards = document.querySelectorAll(
      ".wrapper-hourly-cards .card"
    );
    hourlyCards.forEach((card) => {
      const iconEl = card.querySelector(".wx-icon");
      const hourEl = card.querySelector(".hour");
      const apEl = card.querySelector(".ap");
      const tempEl = card.querySelector(".temp");

      const data = wxData.days[1].hours[card.dataset.hour];

      iconEl.src = getWxIcon(data.icon);
      iconEl.alt = data.icon;
      hourEl.textContent = format(data.datetimeEpoch * 1000, "HH"); // gotcha
      apEl.textContent = format(data.datetimeEpoch * 1000, "aa"); // gotcha
      tempEl.textContent = Math.floor(data.temp) + "°";
    });
  };

  return { render, update };
}
