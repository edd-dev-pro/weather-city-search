const GEOCODING_BASE = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_BASE = "https://api.open-meteo.com/v1/forecast";

export const buildGeocodingURL = (name, count = 5, lang = "es") =>
  `${GEOCODING_BASE}?name=${encodeURIComponent(
    name,
  )}&count=${count}&language=${lang}`;

export const buildWeatherURL = (lat, lon) =>
  `${WEATHER_BASE}?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;

export const fetchJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};
