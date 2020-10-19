import { createSelector } from "reselect";

import { withAppCurrency } from "../utils";

const boughtItemsSelector = (state) => state.boughtItems;

export const currencySelector = (state) => state.currency;

export const boughtItemsWithProperCurrencySelector = createSelector(
  boughtItemsSelector,
  currencySelector,
  (boughtItems, { id: appCurrency, rate: exchangeRate }) => {
    const withCurrency = withAppCurrency({ appCurrency, exchangeRate });

    return Object.values(boughtItems).map((boughtItem) => {
      const { price, currencyId: itemCurrency } = boughtItem;

      return { ...boughtItem, price: withCurrency({ price, itemCurrency }) };
    });
  }
);

export const onlineStoresSelector = (state) => state.onlineStores;

const receivedItemsIdsSelector = (state) => state.receivedItems;

export const receivedItemsSelector = createSelector(
  receivedItemsIdsSelector,
  boughtItemsWithProperCurrencySelector,
  (receivedItemsIds, boughtItems) =>
    receivedItemsIds.map((id) => boughtItems[id])
);

export const sumOrdersByStoreSelector = createSelector(
  boughtItemsWithProperCurrencySelector,
  onlineStoresSelector,
  (boughtItems, onlineStores) => {
    const sumOrdersByStores = boughtItems.reduce((sumOrders, boughtItem) => {
      const { onlineStoreId, price } = boughtItem;

      if (onlineStoreId in sumOrders) {
        sumOrders[onlineStoreId].sum += price;
      } else {
        sumOrders[onlineStoreId] = { sum: price };
      }

      return sumOrders;
    }, {});

    return Object.values(onlineStores).map(({ id }) => ({
      id,
      sumOrders: sumOrdersByStores[id].sum,
    }));
  }
);
