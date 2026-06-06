import "./assets/modern-normalize.css";
import "./assets/reset.css";
import "./index.css";
import "./template.html";
import { getWxData, getLocationData } from "./api.js";
import { Header } from "./view_header.js";
import { CurrentConditions } from "./view_current.js";
import { DailyForecast } from "./view_daily.js";
import { HourlyForecast } from "./view_hourly.js";
import { Attribution } from "./view_attr.js";

async function getLocationName(lat, long) {
  const locData = await getLocationData(lat, long);
  const city = locData.address.city;
  const country = locData.address.country;
  return { city, country };
}

async function renderApp() {
  const headerEl = document.querySelector(".header");
  const mainEl = document.querySelector(".content");
  const footerEl = document.querySelector(".footer");

  // Views
  const header = Header(headerEl);
  const currentConditions = CurrentConditions(mainEl);
  const dailyForecast = DailyForecast(mainEl);
  const hourlyForecast = HourlyForecast(mainEl);
  const attribution = Attribution(footerEl);

  // Build the DOM
  const renderDOM = () => {
    header.render();
    currentConditions.render();
    dailyForecast.render();
    hourlyForecast.render();
    attribution.render();
  };

  // Inject data in to the DOM
  const updateDOM = (wxData, locName) => {
    currentConditions.update(wxData, locName);
    dailyForecast.update(wxData);
    hourlyForecast.update(wxData);
  };

  // Fetch the data and update the DOM
  const loadData = async (place) => {
    const errorEl = document.querySelector(".error");
    try {
      const wxData = await getWxData(place);
      const locName = await getLocationName(wxData.latitude, wxData.longitude);
      updateDOM(wxData, locName);
      errorEl.textContent = "";
    } catch (err) {
      errorEl.textContent = "No search results found!";
    }
  };

  // Render skeleton
  renderDOM();

  // On initial load, display current location weather
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    loadData(`${lat},${long}`);
  });

  // Load data from search
  header.bindSearchClick(loadData);
}

renderApp();
