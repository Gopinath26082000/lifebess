function rangePercent(value, min, max) {
  const numeric = Number(value);
  return Math.min(100, Math.max(0, ((numeric - min) / (max - min)) * 100));
}

function calculateQuote(quote) {
  const bill = Number(quote.bill || 0);
  const area = Number(quote.area || 0);
  const areaKw = area > 0 ? area / 110 : bill / 1500;
  const systemKw = Math.max(1, Math.min(quote.sector === "Commercial" ? 75 : 10, Math.round(areaKw * 10) / 10));
  const subsidy = quote.sector === "Residential" ? Math.min(78000, systemKw <= 1 ? 30000 : systemKw < 3 ? 60000 : 78000) : 0;
  const annualSavings = Math.round(bill * 12 * (quote.sector === "Commercial" ? 0.42 : 0.55));
  const projectCost = Math.round(systemKw * (quote.sector === "Commercial" ? 54000 : 65000));
  const payback = Math.max(1.8, (projectCost - subsidy) / Math.max(annualSavings, 1));
  const co2 = Math.round(systemKw * 1.45 * 10) / 10;
  return { annualSavings, co2, payback: Math.round(payback * 10) / 10, projectCost, subsidy, systemKw };
}

function formatMoney(value) {
  return `Rs. ${Math.round(value).toLocaleString("en-IN")}`;
}

function calculateEligibility(details) {
  const bill = Number(details.bill || 1000);
  const area = Number(details.area || 500);
  const systemKw = Math.max(1, Math.min(10, Math.round((area / 110) * 10) / 10));
  const subsidy = Math.min(78000, systemKw <= 1 ? 30000 : systemKw < 3 ? 60000 : 78000);
  const annualSavings = Math.round(Math.max(bill, 1000) * 12 * 0.55);
  const payback = Math.max(2.2, ((systemKw * 65000) - subsidy) / Math.max(annualSavings, 1));
  const yearlyGeneration = Math.round(systemKw * 1450);
  return {
    annualSavings,
    emi: Math.round(Math.max(1450, ((systemKw * 65000) - subsidy) / 84)),
    payback: Math.round(payback * 10) / 10,
    sanctionedLoad: `${Math.max(2, Math.ceil(systemKw + 1))} kW (Residential)`,
    subsidy,
    systemKw,
    trees: Math.round(yearlyGeneration / 95),
    yearlyCo2: Math.round(systemKw * 1.7 * 10) / 10,
    yearlyGeneration
  };
}

export { rangePercent, calculateQuote, formatMoney, calculateEligibility };
