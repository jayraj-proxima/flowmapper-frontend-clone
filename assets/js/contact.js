
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("countryCode");

  if (!select) {
    console.warn("countryCode select not found on this page");
    return;
  }

  fetch("assets/data/country-codes.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load country-codes.json");
      }
      return response.json();
    })
    .then(countries => {
      countries.forEach(country => {
        const option = document.createElement("option");
        option.value = country.dial_code;
        option.textContent = `${country.name} (${country.dial_code})`;
        select.appendChild(option);
      });

      // default to India
      select.value = "+91";
    })
    .catch(error => {
      console.error("Error loading country codes:", error);
    });
});

