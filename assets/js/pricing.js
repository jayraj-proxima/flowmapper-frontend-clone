const prices = {
  IN: {
    currency: "₹",
    monthly: { basic: 362.64, premium: 725.29 },
    annually: { basic: 362.64 * 11, premium: 725.29 * 11 }
  },
  US: {
    currency: "$",
    monthly: { basic: 4.00, premium: 8.00 },
    annually: { basic: 4.00 * 11, premium: 8.00 * 11 }
  }
};

let currentPeriod = "monthly";
let currentCountry = "IN";

// Cache DOM elements
const toggleButtons = document.querySelectorAll(".toggle-btn");
const countrySelect = document.getElementById("countrySelect");
const mindmapLimits = document.querySelectorAll(".mindmap-limit");
const currencyEls = document.querySelectorAll(".currency");
const periodEls = document.querySelectorAll(".period");

const basicPriceEl = document.querySelector('[data-plan="basic"]');
const premiumPriceEl = document.querySelector('[data-plan="premium"]');

function updatePrices() {
  const { currency, [currentPeriod]: periodPrices } = prices[currentCountry];

  // Update currency
  currencyEls.forEach(el => el.textContent = currency);

  // Update prices
  basicPriceEl.textContent = periodPrices.basic.toFixed(2);
  premiumPriceEl.textContent = periodPrices.premium.toFixed(2);

  // Update period text
  periodEls.forEach(el => {
    el.textContent = currentPeriod === "monthly" ? "/month" : "/year";
  });

  // Update mindmap limits
  mindmapLimits.forEach(item => {
    item.textContent = item.dataset[currentPeriod];
  });
}

// Toggle buttons
toggleButtons.forEach(button => {
  button.addEventListener("click", () => {
    toggleButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    currentPeriod = button.dataset.period;
    updatePrices();
  });
});

// Country change
countrySelect.addEventListener("change", e => {
  currentCountry = e.target.value;
  updatePrices();
});

// Initial load
updatePrices();
