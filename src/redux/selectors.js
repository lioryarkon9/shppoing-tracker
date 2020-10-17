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
