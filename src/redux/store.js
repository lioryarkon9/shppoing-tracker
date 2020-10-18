import { createStore, combineReducers } from "redux";

import boughtItems from "./reducers/boughtItems.reducer";
import currency from "./reducers/currency.reducer";
import onlineStores from "./reducers/onlineStores.reducer";
import receivedItems from "./reducers/receivedItems.reducer";

const rootReducer = combineReducers({
  boughtItems,
  currency,
  onlineStores,
  receivedItems,
});

const store = createStore(rootReducer);

export default store;
