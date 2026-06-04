import { generateDOM, getWxIcon, html, $ } from "./helpers.js";
import { format } from "date-fns";

export function DailyForecast(root) {
  const dailyMarkup = [1, 2, 3, 4, 5, 6, 7]
    .map((day) => {
      return html`
        <div class="card day-${day}" data-day=${day}>
          <p class="week-day"></p>
          <img src="#" alt="" class="wx-icon" />
          <div class="temp">
            <p class="tempmax"></p>
            <p class="tempmin"></p>
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
  const load = (wxData) => {
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

  return { render, load };
}
