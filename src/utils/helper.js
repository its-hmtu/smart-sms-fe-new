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

const getPathUrl = (pathname) => {
  let accumulatedPath = '';

  return pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      accumulatedPath += `/${segment}`;
      return {
        name: segment,
        url: accumulatedPath,
        isDynamicSegment: /^\d+$/.test(segment), // You can extend to match UUIDs
      };
    });
}

export {
  formatLabel,
  formatNumber,
  getPathUrl
}

