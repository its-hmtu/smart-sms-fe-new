const formatLabel = (name) => {
  if (!name) return "";
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatNumber = (value) => {
  if (typeof value === "number") {
    return value.toLocaleString();
  }
  return value;
};

export {
  formatLabel,
  formatNumber
}