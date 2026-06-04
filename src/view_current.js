import { generateDOM, getWxIcon, html, $ } from "./helpers.js";
import { format } from "date-fns";

export function CurrentConditions(root) {
  const markup = html`
    <section class="current-conditions">
      <div class="info-primary">
        <div class="group-location">
          <p class="location">_</p>
          <p class="date">_</p>
        </div>
        <div class="group-current-wx">
          <img src="#" alt="loading" class="wx-icon" />
          <p class="temp">_</p>
        </div>
      </div>
      <div class="info-secondary">
        <div class="card">
          <p>Feels Like</p>
          <p class="feelslike">_</p>
        </div>
        <div class="card">
          <p>Humidity</p>
          <p class="humidity">_</p>
        </div>
        <div class="card">
          <p>Wind</p>
          <p class="windspeed">_</p>
        </div>
        <div class="card">
          <p>Precipitation</p>
          <p class="precip">_</p>
        </div>
      </div>
    </section>
  `;

  const render = () => root.appendChild(generateDOM(markup));

  const load = (wxData) => {
    const locationEl = $(".location");
    const dateEl = $(".date");
    const iconEl = $(".current-conditions .wx-icon"); // specific icon target, bcz there are 2 others
    const tempEl = $(".temp");
    const feelslikeEl = $(".feelslike");
    const humidityEl = $(".humidity");
    const windspeedEl = $(".windspeed");
    const precipEl = $(".precip");

    locationEl.textContent = wxData.address;
    dateEl.textContent = format(
      wxData.currentConditions.datetimeEpoch * 1000,
      "EEE"
    );
    iconEl.src = getWxIcon(wxData.currentConditions.icon);
    iconEl.alt = wxData.currentConditions.icon;
    tempEl.textContent = wxData.currentConditions.temp;
    feelslikeEl.textContent = wxData.currentConditions.feelslike + "℃";
    humidityEl.textContent = wxData.currentConditions.humidity + "%";
    windspeedEl.textContent = wxData.currentConditions.windspeed + " kph";
    precipEl.textContent = wxData.currentConditions.precip || 0 + " mm";
  };

  return { render, load };
}
