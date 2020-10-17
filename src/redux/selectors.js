import { createSelector } from "reselect";

export const boughtItemsSelector = (state) => state.boughtItems;
export const currentCurrencySelector = (state) => state.currentCurrency;
export const onlineStoresSelector = (state) => state.onlineStores;
const receivedItemsIdsSelector = (state) => state.receivedItems;

export const receivedItemsSelector = createSelector(
  receivedItemsIdsSelector,
  boughtItemsSelector,
  (receivedItemsIds, boughtItems) =>
    receivedItemsIds.map((id) => boughtItems[id])
);

export const sumOrdersByStoreSelector = createSelector(
  boughtItemsSelector,
  onlineStoresSelector,
  (boughtItems, onlineStores) => {
    const sumOrdersByStores = Object.values(boughtItems).reduce(
      (sumOrders, boughtItem) => {
        const { onlineStoreId, price } = boughtItem;

        if (onlineStoreId in sumOrders) {
          sumOrders[onlineStoreId].sum += price;
        } else {
          sumOrders[onlineStoreId] = { sum: price };
        }

        return sumOrders;
      },
      {}
    );

    return Object.values(onlineStores).map(({ id }) => ({
      id,
      sumOrders: sumOrdersByStores[id].sum,
    }));
  }
);
