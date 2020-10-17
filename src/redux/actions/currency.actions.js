export const SET_CURRENCY = "[currency] SET_CURRENCY";

export const setCurrency = (currencyId) => ({
  type: SET_CURRENCY,
  payload: { currencyId },
});
