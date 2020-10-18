export const SET_CURRENCY_ID = "[currency] SET_CURRENCY_ID";
export const SET_CURRENCY_RATE = "[currency] SET_CURRENCY_RATE";

export const setCurrencyId = (currencyId) => ({
  type: SET_CURRENCY_ID,
  payload: { currencyId },
});

export const setCurrencyRate = (rate) => ({
  type: SET_CURRENCY_RATE,
  payload: { rate },
});
