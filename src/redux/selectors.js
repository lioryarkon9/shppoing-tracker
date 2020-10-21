import { createSelector } from "reselect";

import { withAppCurrency } from "../utils";

const boughtItemsSelector = (state) => state.boughtItems;

export const currencySelector = (state) => state.currency;

export const boughtItemsWithProperCurrencySelector = createSelector(
  boughtItemsSelector,
  currencySelector,
  (boughtItems, { id: appCurrency, rate: exchangeRate }) => {
    const withCurrency = withAppCurrency({ appCurrency, exchangeRate });

    return Object.values(boughtItems).reduce(
      (boughtItemsWithCurrency, boughtItem) => {
        const { id, price, currencyId: itemCurrency } = boughtItem;

        boughtItemsWithCurrency[id] = {
          ...boughtItem,
          price: withCurrency({ price, itemCurrency }),
        };

        return boughtItemsWithCurrency;
      },
      {}
    );
  }
);

export const onlineStoresSelector = (state) => state.onlineStores;

export const receivedItemsIdsSelector = (state) => state.receivedItems;

export const receivedItemsSelector = createSelector(
  receivedItemsIdsSelector,
  boughtItemsWithProperCurrencySelector,
  (receivedItemsIds, boughtItems) =>
    receivedItemsIds.map((id) => boughtItems[id])
);

export const sumOrdersByStoreSelector = createSelector(
  boughtItemsWithProperCurrencySelector,
  (boughtItems) =>
    Object.values(boughtItems).reduce((sumOrders, boughtItem) => {
      const { onlineStoreId, price } = boughtItem;

      if (onlineStoreId in sumOrders) {
        sumOrders[onlineStoreId].sumOrders += price;
      } else {
        sumOrders[onlineStoreId] = { id: onlineStoreId, sumOrders: price };
      }

      return sumOrders;
    }, {})
);
