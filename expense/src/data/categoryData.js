import diningIcon from "../assets/icon/dining.png";
import entertainmentIcon from "../assets/icon/entertainment.png";
import transactionIcon from "../assets/icon/transaction.png";
import addExpenseIcon from "../assets/icon/addexpense.png";
import categoriesIcon from "../assets/icon/categories (1).png";
import settingsIcon from "../assets/icon/setting (2).png";
import deleteIcon from "../assets/icon/delete (2).png";
import editIcon from "../assets/icon/edit_.png";
import notificationIcon from "../assets/icon/notification.png";
import profileIcon from "../assets/icon/profile (3).png";
import travelIcon from "../assets/icon/travel.png";
import eduIcon from "../assets/icon/education.png";
import grocerryIcon from "../assets/icon/grocery.png";
import homeIcon from "../assets/icon/home (2).png";
import dashboardIcon from "../assets/icon/dashboard.png";

const defaultCategoryDetails = [
  { name: "Food & Dining", icon: "dining", color: "#0da570" },
  { name: "Travel", icon: "travel", color: "#4385ef" },
  { name: "Education", icon: "education", color: "#8757ed" },
  { name: "Housing", icon: "home", color: "#ed4388" },
  { name: "Groceries", icon: "groceries", color: "#f59b0b" },
  { name: "Entertainment", icon: "entertainment", color: "#ef4444" },
  { name: "Tuition & Fees", icon: "education", color: "#4385ef" },
];

export const defaultCategories = defaultCategoryDetails.map(({ name }) => name);

export const iconAssets = {
  "Food & Dining": diningIcon,
  Travel: travelIcon,
  "Tuition & Fees": eduIcon,
  Entertainment: entertainmentIcon,
  Education: eduIcon,
  Income: addExpenseIcon,
  Housing: homeIcon,
  Groceries: grocerryIcon,
};

export const iconAssetsById = {
  dining: diningIcon,
  travel: travelIcon,
  education: eduIcon,
  entertainment: entertainmentIcon,
  home: homeIcon,
  groceries: grocerryIcon,
};

const defaultsByName = new Map(
  defaultCategoryDetails.map((category) => [
    category.name.toLowerCase(),
    category,
  ]),
);

export function normalizeCategory(category) {
  if (typeof category === "string") {
    const name = category.trim();
    const defaults = defaultsByName.get(name.toLowerCase());

    if (defaults) return { ...defaults };

    return { name, icon: "dining", color: "#0da570" };
  }

  if (!category || typeof category !== "object") return null;

  const name = String(category.name || category.label || "").trim();
  if (!name) return null;

  const defaults = defaultsByName.get(name.toLowerCase()) || {};

  return {
    name,
    icon: category.icon || defaults.icon || "dining",
    color: category.color || defaults.color || "#0da570",
  };
}

export function getCategoryName(category) {
  return normalizeCategory(category)?.name || "";
}

export function getCategoryIconSrc(category) {
  const normalized = normalizeCategory(category);

  return (
    iconAssetsById[normalized?.icon] ||
    iconAssets[normalized?.name] ||
    iconAssets["Food & Dining"]
  );
}

export function getCategoryColor(category) {
  return normalizeCategory(category)?.color || "#0da570";
}

export function mergeCategories(...groups) {
  const categories = [];
  const seen = new Set();

  groups.forEach((group) => {
    const items = Array.isArray(group) ? group : [group];

    items.forEach((item) => {
      const normalized = normalizeCategory(item);
      if (!normalized) return;

      const key = normalized.name.toLowerCase();
      if (seen.has(key)) return;

      seen.add(key);
      categories.push(normalized);
    });
  });

  return categories;
}

export const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: dashboardIcon },
  { id: "expense", label: "Add Expense", icon: addExpenseIcon },
  { id: "transactions", label: "Transactions", icon: transactionIcon },
  { id: "categories", label: "Categories", icon: categoriesIcon },
  { id: "settings", label: "Settings", icon: settingsIcon },
];

export const actionIcons = {
  delete: deleteIcon,
  edit: editIcon,
  notification: notificationIcon,
  profile: profileIcon,
};
