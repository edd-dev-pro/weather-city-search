const iconMap = {
  0: "day-sunny",
  1: "day-cloudy",
  2: "day-cloudy",
  3: "cloudy",
  45: "fog",
  48: "fog",
  51: "sprinkle",
  53: "sprinkle",
  55: "sprinkle",
  61: "rain",
  63: "rain",
  65: "rain",
  80: "rain",
  81: "rain",
  82: "rain",
  71: "snow",
  73: "snow",
  75: "snow",
};

export const getWeatherIconHtml = (code) => {
  const name = iconMap[code] || "na";
  const src = `icons/wi-${name}.svg`;
  return `<img src="${src}" class="img-color" alt="Clima: ${name}" role="img" />`;
};
