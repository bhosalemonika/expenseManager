export const defaultSettings = {
  currency: "INR",
  theme: "light",
  weeklySummary: true,
  transactionAlerts: true,
};

export const currencyOptions = [
  { value: "INR", label: "INR (₹)", locale: "en-IN" },
  { value: "USD", label: "USD ($)", locale: "en-US" },
  { value: "EUR", label: "EUR (€)", locale: "de-DE" },
  { value: "GBP", label: "GBP (£)", locale: "en-GB" },
];

export const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export function normalizeSettings(settings = {}) {
  const result = {
    ...defaultSettings,
    ...settings,
  };

  const validCurrency = currencyOptions.some(
    (option) => option.value === result.currency,
  );

  const validTheme =
    result.theme === "light" ||
    result.theme === "dark" ;

  if (!validCurrency) {
    result.currency = "INR";
  }

  if (!validTheme) {
    result.theme = "light";
  }

  result.weeklySummary =
    settings.weeklySummary ?? defaultSettings.weeklySummary;

  result.transactionAlerts =
    settings.transactionAlerts ?? defaultSettings.transactionAlerts;

  return result;
}

export function formatMoney(value, currency = "INR") {
  const option =
    currencyOptions.find((item) => item.value === currency) ||
    currencyOptions[0];

  const amount = Number(value) || 0;

  return new Intl.NumberFormat(option.locale, {
    style: "currency",
    currency: option.value,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function applyThemePreference(theme = "light") {
  if (typeof document === "undefined") {
    return "light";
  }

  let finalTheme = theme;

  if (theme !== "light" && theme !== "dark" && theme !== "system") {
    finalTheme = "light";
  }

  if (finalTheme === "system") {
    const darkMode = window.matchMedia?.(
      "(prefers-color-scheme: dark)",
    ).matches;

    finalTheme = darkMode ? "dark" : "light";
  }

  document.documentElement.dataset.theme = finalTheme;
  document.documentElement.dataset.themePreference = theme;

  return finalTheme;
}
