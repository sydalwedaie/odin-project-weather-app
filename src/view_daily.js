import { generateDOM, getWxIcon, html, $ } from "./helpers.js";
import { format } from "date-fns";

export function DailyForecast(root) {
  const dailyMarkup = [1, 2, 3, 4, 5, 6, 7]
    .map((day) => {
      return html`
        <div class="card day-${day}" data-day=${day}>
          <p class="value week-day">_</p>
          <img src="#" alt="" class="value wx-icon" />
          <div class="temp">
            <p class="value tempmax">_</p>
            <p class="value tempmin">_</p>
          </div>
        </div>
      `;
    })
    .join("");

  const markup = html`
    <section class="daily-forecast">
      <h1>Daily forecast</h1>
      <div class="wrapper-daily-cards">${dailyMarkup}</div>
    </section>
  `;

  const render = () => root.appendChild(generateDOM(markup));
  const update = (wxData) => {
    const dailyCards = document.querySelectorAll(".wrapper-daily-cards .card");
    dailyCards.forEach((card) => {
      const weekDayEl = card.querySelector(".week-day");
      const iconEl = card.querySelector(".wx-icon");
      const tempmaxEl = card.querySelector(".tempmax");
      const tempminEl = card.querySelector(".tempmin");

      const data = wxData.days[card.dataset.day];

      weekDayEl.textContent = format(data.datetimeEpoch * 1000, "EEE"); // gotcha
      iconEl.src = getWxIcon(data.icon);
      iconEl.alt = data.icon;
      tempmaxEl.textContent = Math.round(data.tempmax) + "°";
      tempminEl.textContent = Math.round(data.tempmin) + "°";
    });
  };

  return { render, update };
}
