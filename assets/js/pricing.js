// ================= CENTRALIZED USD PRICES =================
const BASE_MONTHLY_USD = {
  basic: 4,
  premium: 8
};

const ANNUAL_MULTIPLIER = 11;

const USD_PRICES = {
  monthly: {
    basic: BASE_MONTHLY_USD.basic,
    premium: BASE_MONTHLY_USD.premium
  },
  annually: {
    basic: BASE_MONTHLY_USD.basic * ANNUAL_MULTIPLIER,
    premium: BASE_MONTHLY_USD.premium * ANNUAL_MULTIPLIER
  }
};

let currentPeriod = "monthly";
let currentCountry = "US";
let usdToInrRate = null;

// ================= DOM ELEMENTS =================
const toggleButtons = document.querySelectorAll(".toggle-btn");
const countrySelect = document.getElementById("countrySelect");
const currencyEls = document.querySelectorAll(".currency");
const periodEls = document.querySelectorAll(".period");
const mindmapLimits = document.querySelectorAll(".mindmap-limit");

const basicPriceEl = document.querySelector('[data-plan="basic"]');
const premiumPriceEl = document.querySelector('[data-plan="premium"]');

// ================= EXCHANGE RATE =================
async function fetchUsdToInrRate() {
  if (usdToInrRate) return usdToInrRate;

  try {
    const res = await fetch(
      "https://api.frankfurter.app/latest?from=USD&to=INR"
    );
    const data = await res.json();
    usdToInrRate = data.rates.INR;
    return usdToInrRate;
  } catch (err) {
    console.error("Exchange rate fetch failed", err);
    return 83; // fallback
  }
}

// ================= UPDATE UI =================
async function updatePrices() {
  let multiplier = 1;
  let currency = "$";

  if (currentCountry === "IN") {
    multiplier = await fetchUsdToInrRate();
    currency = "₹";
  }

  const basePrices = USD_PRICES[currentPeriod];

  // Prices
  basicPriceEl.textContent = (basePrices.basic * multiplier).toFixed(2);
  premiumPriceEl.textContent = (basePrices.premium * multiplier).toFixed(2);

  // Currency symbol
  currencyEls.forEach(el => (el.textContent = currency));

  // Period text
  periodEls.forEach(el => {
    el.textContent = currentPeriod === "monthly" ? "/month" : "/year";
  });

  // Mindmap limit text
  mindmapLimits.forEach(item => {
    item.textContent = item.dataset[currentPeriod];
  });
}

// ================= EVENTS =================

// Monthly / Annual toggle
toggleButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    toggleButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentPeriod = btn.dataset.period;
    updatePrices();
  });
});

// Country change
countrySelect.addEventListener("change", e => {
  currentCountry = e.target.value;
  updatePrices();
});

// ================= INITIAL LOAD =================
updatePrices();
