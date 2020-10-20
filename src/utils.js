const getCurrencyIndicator = (currencyId) =>
  currencyId === "usd" ? "$" : "NIS";

const formatPrice = (price) => price.toLocaleString();

export const withFormatAndCurrencyPrice = (currencyId) => (price) => {
  if (currencyId === "ils") {
    return `${formatPrice(price)} ${getCurrencyIndicator(currencyId)}`;
  }

  return `${getCurrencyIndicator(currencyId)}${formatPrice(price)}`;
};

export const withAppCurrency = ({ appCurrency, exchangeRate }) => ({
  price,
  itemCurrency,
}) => {
  if (appCurrency === itemCurrency) {
    return price;
  }

  if (appCurrency === "usd") {
    return price / exchangeRate;
  }

  return price * exchangeRate;
};

export const byDeliveryEstimationDate = (shoppingItemA, shoppingItemB) => {
  const { deliveryEstimationDate: dateA } = shoppingItemA;
  const { deliveryEstimationDate: dateB } = shoppingItemB;

  if (new Date(dateA) < new Date(dateB)) {
    return -1;
  }

  return 1;
};
