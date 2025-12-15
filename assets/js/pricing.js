const prices = {
  IN: {
    monthly: { basic: 362.64, premium: 725.29 },
    annually: { basic: 362.64 * 11, premium: 725.29 * 11 }
  },
  US: {
    monthly: { basic: 4.00, premium: 8.00 },
    annually: { basic: 4.00 * 11, premium: 8.00 * 11 }
  }
};

let currentPeriod = "monthly";
let currentCountry = "IN";

const toggleButtons = document.querySelectorAll(".toggle-btn");
const countrySelect = document.getElementById("countrySelect");

function updatePrices() {
  const currency = currentCountry === "IN" ? "₹" : "$";

  document.querySelectorAll(".currency").forEach(el => {
    el.textContent = currency;
  });

  document.querySelector('[data-plan="basic"]').textContent =
    prices[currentCountry][currentPeriod].basic.toFixed(2);

  document.querySelector('[data-plan="premium"]').textContent =
    prices[currentCountry][currentPeriod].premium.toFixed(2);

  document.querySelectorAll(".period").forEach(el => {
    el.textContent = currentPeriod === "monthly" ? "/month" : "/year";
  });
}

toggleButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    toggleButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentPeriod = btn.dataset.period;
    updatePrices();
  });
});

countrySelect.addEventListener("change", e => {
  currentCountry = e.target.value;
  updatePrices();
});

// Initial load
updatePrices();
