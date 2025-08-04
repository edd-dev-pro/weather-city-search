import { buildGeocodingURL, buildWeatherURL, fetchJson } from "./api.js";
import { getWeatherIconHtml } from "./icons.js";
import {
  validateCityInput,
  toggleSearchButtonState,
  renderCityOptions,
  showWeatherCard,
} from "./ui.js";

const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const cityError = document.getElementById("cityError");
const cityListEl = document.getElementById("cityList");
const weatherCard = document.getElementById("weatherCard");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validateCityInput(cityInput, cityError)) return;

  const query = cityInput.value.trim();
  cityListEl.innerHTML = "";
  weatherCard.classList.add("d-none");
  toggleSearchButtonState(searchForm, true);

  try {
    // 1. Geocoding
    const geoData = await fetchJson(buildGeocodingURL(query));
    const results = geoData.results || [];

    if (results.length === 0) {
      cityListEl.innerHTML =
        '<div class="alert alert-warning">⚠️ Ciudad no encontrada.</div>';
    } else if (results.length === 1) {
      await handleWeather(results[0]);
    } else {
      renderCityOptions(cityListEl, results, handleWeather);
    }
  } catch (err) {
    console.error(err);
    cityListEl.innerHTML =
      '<div class="alert alert-danger">Error al buscar la ciudad.</div>';
  } finally {
    toggleSearchButtonState(searchForm, false);
  }
});

async function handleWeather(city) {
  cityListEl.innerHTML = "";
  weatherCard.classList.add("d-none");
  toggleSearchButtonState(searchForm, true);

  try {
    // 2. Weather
    const weatherData = await fetchJson(
      buildWeatherURL(city.latitude, city.longitude),
    );
    const cw = weatherData.current_weather;
    if (!cw) throw new Error("Sin datos de clima");

    const iconHtml = getWeatherIconHtml(cw.weathercode);
    const time = new Date(cw.time).toLocaleString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });

    showWeatherCard(weatherCard, {
      name: city.name,
      country: city.country,
      temperature: cw.temperature,
      time,
      iconHtml,
    });

    cityInput.value = "";
    cityInput.blur();
  } catch (err) {
    console.error(err);
    cityListEl.innerHTML =
      '<div class="alert alert-danger">Error al obtener el clima.</div>';
  } finally {
    toggleSearchButtonState(searchForm, false);
  }
}
