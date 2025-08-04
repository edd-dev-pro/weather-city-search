/* INFO EMC [08/04/2025]: validates city input and displays feedback */
export const validateCityInput = (inputEl, errorEl) => {
  const value = inputEl.value.trim();
  inputEl.classList.remove("is-invalid");
  errorEl.textContent = "";

  if (!value) {
    errorEl.textContent = "Por favor ingresa el nombre de la ciudad.";
  } else if (value.length < 2) {
    errorEl.textContent = "Introduce al menos 2 caracteres.";
  } else if (!/^[A-Za-zÀ-ÿ0-9'\-\s]+$/.test(value)) {
    errorEl.textContent =
      "Sólo letras, números, espacios, guiones o apóstrofos.";
  }

  if (errorEl.textContent) {
    inputEl.classList.add("is-invalid");
    return false;
  }
  return true;
};

/* INFO EMC [08/04/2025]: show or hide the spinner on the search button */
export const toggleSearchButtonState = (formEl, isLoading) => {
  const btn = formEl.querySelector("button");
  btn.disabled = isLoading;
  btn.innerHTML = isLoading
    ? '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Buscando...'
    : "Buscar";
};

/* INFO EMC [08/04/2025]: renders city options after geocoding */
export const renderCityOptions = (cityListEl, cities, onSelect) => {
  cityListEl.innerHTML = "";
  const group = document.createElement("div");
  group.className = "list-group";

  cities.forEach((city) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "list-group-item list-group-item-action";
    btn.textContent = `${city.name}, ${city.country}`;
    btn.addEventListener("click", () => onSelect(city));
    group.appendChild(btn);
  });

  cityListEl.appendChild(group);
};

/* INFO EMC [08/04/2025]: displays weather card with data and icon HTML */
export const showWeatherCard = (
  cardEl,
  { name, country, temperature, time, iconHtml },
) => {
  cardEl.classList.remove("d-none");
  cardEl.querySelector("#weatherIcon").innerHTML = iconHtml;
  cardEl.querySelector("#locationName").textContent = `${name}, ${country}`;
  cardEl.querySelector("#temperature").textContent = temperature.toFixed(1);
  cardEl.querySelector("#reportTime").textContent = time;
};
