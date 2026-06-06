import "./assets/modern-normalize.css";
import "./assets/reset.css";
import "./index.css";
import "./template.html";
import { Header } from "./view_header.js";
import { CurrentConditions } from "./view_current.js";
import { Attribution } from "./view_attr.js";
import { getWxData } from "./api.js";
import { DailyForecast } from "./view_daily.js";
import { HourlyForecast } from "./view_hourly.js";

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

  // Render skeleton
  header.render();
  currentConditions.render();
  dailyForecast.render();
  hourlyForecast.render();
  attribution.render();

  // Search
  header.bindSearchClick(async (place) => {
    const wxData = await getWxData(place);
    console.log(wxData);

    // Load data
    currentConditions.load(wxData);
    dailyForecast.load(wxData);
    hourlyForecast.load(wxData);
  });
}

renderApp();
