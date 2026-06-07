import { generateDOM, getWxIcon, html, $ } from "./helpers.js";
import { format } from "date-fns";

export function CurrentConditions(root) {
  const markup = html`
    <section class="current-conditions">
      <div class="info-primary">
        <div class="group-location">
          <p class="value location">_</p>
          <p class="value date">_</p>
        </div>
        <div class="group-current-wx">
          <img src="#" alt="" class="value wx-icon" />
          <p class="value temp">_</p>
        </div>
      </div>
      <div class="info-secondary">
        <div class="card">
          <p>Feels Like</p>
          <p class="value feelslike">_</p>
        </div>
        <div class="card">
          <p>Humidity</p>
          <p class="value humidity">_</p>
        </div>
        <div class="card">
          <p>Wind</p>
          <p class="value windspeed">_</p>
        </div>
        <div class="card">
          <p>Precipitation</p>
          <p class="value precip">_</p>
        </div>
      </div>
    </section>
  `;

  const render = () => root.appendChild(generateDOM(markup));

  const update = (wxData, locName) => {
    const locationEl = $(".location");
    const dateEl = $(".date");
    const iconEl = $(".current-conditions .wx-icon"); // specific icon target, bcz there are 2 others
    const tempEl = $(".temp");
    const feelslikeEl = $(".feelslike");
    const humidityEl = $(".humidity");
    const windspeedEl = $(".windspeed");
    const precipEl = $(".precip");

    const data = wxData.currentConditions;

    locationEl.textContent = `${locName.city}, ${locName.country}`;
    dateEl.textContent = format(data.datetimeEpoch * 1000, "EEEE, MMM d, yyyy");
    iconEl.src = getWxIcon(data.icon);
    iconEl.alt = data.icon;
    tempEl.textContent = Math.floor(data.temp) + "°";
    feelslikeEl.textContent = data.feelslike + "°";
    humidityEl.textContent = data.humidity + "%";
    windspeedEl.textContent = Math.floor(data.windspeed) + " km/h";
    precipEl.textContent = data.precip || 0 + " mm";
  };

  return { render, update };
}
